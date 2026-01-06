import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { register, expandTypesMap } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Builds design tokens from Token Studio JSON using Style Dictionary full pipeline
 * Outputs to src/tokens/variables.css
 * 
 * IMPORTANT: Only processes DEFAULT theme (light mode)
 * Skips INVERTED theme to prevent semantic token conflicts
 * 
 * Uses @tokens-studio/sd-transforms for proper token transformation including:
 * - ts/size/px - Adds px units to unitless dimension/fontSize tokens
 * - ts/resolveMath - Resolves math expressions
 * - ts/typography/fontWeight - Converts font-weight names to numbers
 * - ts/color/modifiers - Resolves Token Studio color modifiers (lighten, darken, alpha, mix)
 * - ts/size/lineheight - Converts percentage line-heights to unitless
 * - ts/size/css/letterspacing - Converts percentage letter-spacing to em
 */

async function buildTokens() {
  console.log('Building tokens using Style Dictionary full pipeline...');

  const tokenFile = path.join(__dirname, '..', 'TDS Helper tokens.json');
  const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));

  const merged = {};

  function deepMerge(target, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && !('$value' in source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  // Filter tokens to only include DEFAULT theme
  // IMPORTANT: Only use 'tonies/default' theme, NOT 'night-time-adventure/default'
  // CRITICAL: Never process INVERTED themes (colors/tonies/inverted, colors/night-time-adventure/inverted)
  let processedCount = 0;
  let skippedInvertedCount = 0;
  let skippedOtherThemeCount = 0;
  
  for (const category in tokenData) {
    if (tokenData.hasOwnProperty(category)) {
      // Explicitly skip all INVERTED themes
      if (category.includes('/inverted')) {
        skippedInvertedCount++;
        console.warn(`⚠️  Skipping INVERTED theme: ${category}`);
        continue;
      }
      
      // Only process tonies/default theme (not night-time-adventure/default)
      if (category === 'colors/tonies/default' || category.startsWith('core/') || category.startsWith('styles/')) {
        const categoryData = tokenData[category];
        if (categoryData.tds) {
          deepMerge(merged, categoryData.tds);
          processedCount++;
          console.log(`✓ Processing: ${category}`);
        }
      } else if (category.includes('/default')) {
        skippedOtherThemeCount++;
        console.warn(`⚠️  Skipping non-tonies theme: ${category}`);
      }
    }
  }
  
  console.log(`\n📊 Theme filtering summary:`);
  console.log(`  ✓ Processed: ${processedCount} categories (DEFAULT theme only)`);
  console.log(`  ⚠️  Skipped INVERTED: ${skippedInvertedCount} categories`);
  console.log(`  ⚠️  Skipped other themes: ${skippedOtherThemeCount} categories\n`);

  const wrappedTokens = { tds: merged };

  // Fix border tokens with empty width/style values before Style Dictionary processes them
  function fixInvalidBorderTokens(obj, path = '') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const token = obj[key];
        const currentPath = path ? `${path}.${key}` : key;
        
        if (token && typeof token === 'object') {
          if ('$value' in token) {
            if (token.$type === 'border' && typeof token.$value === 'object') {
              const borderValue = token.$value;
              const fullPath = `tds.${currentPath}`;
              if (borderValue.width === '' || borderValue.style === '') {
                console.warn(`  ⚠️  Fixing border token with empty width/style: ${fullPath}`);
                if (borderValue.width === '') borderValue.width = '0px';
                if (borderValue.style === '') borderValue.style = 'solid';
              }
            }
          } else {
            fixInvalidBorderTokens(token, currentPath);
          }
        }
      }
    }
  }
  
  fixInvalidBorderTokens(wrappedTokens.tds);

  // Write filtered tokens to a temporary file for Style Dictionary to process
  const tempTokenFile = path.join(__dirname, '..', '.tokens-temp.json');
  fs.writeFileSync(tempTokenFile, JSON.stringify(wrappedTokens, null, 2), 'utf8');

  // Register sd-transforms with Style Dictionary
  // Use 'hex' format for color modifiers to get consistent hex output
  register(StyleDictionary, {
    excludeParentKeys: false,
    'ts/color/modifiers': {
      format: 'hex', // Output color modifiers as hex (can be 'hex' | 'hsl' | 'lch' | 'p3' | 'srgb')
    },
  });

  // Use Style Dictionary with full pipeline
  // The 'tokens-studio' transform group includes ALL transforms:
  // - ts/descriptionToComment, ts/resolveMath, ts/size/px, ts/opacity, ts/size/lineheight,
  // - ts/typography/fontWeight, ts/color/modifiers, ts/size/css/letterspacing, 
  // - ts/color/css/hexrgba, ts/shadow/innerShadow
  const sd = new StyleDictionary({
    source: [tempTokenFile],
    preprocessors: ['tokens-studio'], // Expands composites and aligns types
    expand: {
      typesMap: expandTypesMap, // Use Token Studio's expandTypesMap for proper expansion
    },
    platforms: {
      css: {
        transformGroup: 'tokens-studio', // Applies ALL ts/* transforms
        transforms: ['name/kebab'], // Add name transform for kebab-case variable names
        buildPath: 'src/tokens/',
        mathFractionDigits: 3, // Decimal precision for math calculations
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables',
          },
        ],
      },
    },
  });

  // Build using Style Dictionary's pipeline
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();

  // Post-process to add @font-faces and fix transparent colors
  const outputPath = path.join(__dirname, '..', 'src', 'tokens', 'variables.css');
  let cssContent = fs.readFileSync(outputPath, 'utf8');
  
  // Convert #0000 (4-digit hex with alpha) to 'transparent' keyword for better browser support
  // This ensures transparent colors render correctly in all browsers
  cssContent = cssContent.replace(/:\s*#0000(\s*;|\s*\/\*)/g, ': transparent$1');
  
  cssContent = generateFontFaces() + '\n' + cssContent;
  fs.writeFileSync(outputPath, cssContent, 'utf8');

  // Clean up temporary file
  fs.unlinkSync(tempTokenFile);

  console.log('✅ Tokens built successfully using Style Dictionary pipeline!');
  console.log(`✅ Output: src/tokens/variables.css`);
  console.log('✅ All transforms applied:');
  console.log('   - ts/size/px (adds px to unitless tokens)');
  console.log('   - ts/resolveMath (resolves math expressions)');
  console.log('   - ts/typography/fontWeight (converts names to numbers)');
  console.log('   - ts/color/modifiers (resolves TS color modifiers)');
  console.log('   - ts/size/lineheight (converts % to unitless)');
  console.log('   - ts/size/css/letterspacing (converts % to em)');
}

/**
 * Generates @font-face declarations for Wonder font
 */
function generateFontFaces() {
  const fontWeights = {
    'Thin': 100,
    'ExtraLight': 200,
    'Light': 300,
    'Regular': 400,
    'Medium': 500,
    'SemiBold': 600,
    'Bold': 700,
    'ExtraBold': 800,
    'Black': 900,
  };

  let fontFaces = '';
  
  for (const [name, weight] of Object.entries(fontWeights)) {
    fontFaces += `@font-face {
  font-family: 'Wonder';
  src: url('/wonder font/Wonder-${name}.ttf') format('truetype');
  font-weight: ${weight};
  font-style: normal;
  font-display: swap;
}

`;
  }
  
  return fontFaces;
}

try {
  await buildTokens();
} catch (error) {
  console.error('❌ Error building tokens:', error);
  process.exit(1);
}
