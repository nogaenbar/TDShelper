# Style Dictionary Setup & Token Pipeline

## Overview

This document details the complete token transformation pipeline for the TDS Helper project, from Token Studio JSON to CSS variables using Style Dictionary. This setup ensures all design tokens are properly transformed, typed, and ready for use in our component library.

---

## 🎯 Philosophy: Token-First Design System

**CRITICAL PRINCIPLE:** This design system uses **ONLY** CSS variables generated from our token system. 

- ✅ **DO:** Use `var(--tds-color-background-surface-medium)`
- ❌ **DON'T:** Use `background-color: #ffffff` or any hardcoded values
- ❌ **DON'T:** Use magic numbers like `padding: 16px`

Every visual property must derive from a token in `src/tokens/variables.css`.

---

## 📦 Tech Stack

- **Token Studio**: Design token management in Figma
- **Style Dictionary v4**: Token transformation engine
- **@tokens-studio/sd-transforms**: Token Studio-specific transforms for Style Dictionary
- **ColorJS**: Color manipulation library (for advanced color operations)

---

## 🏗️ Architecture

```
Token Studio (Figma)
        ↓
TDS Helper tokens.json (Raw export)
        ↓
config/build-tokens.js (Filtering & preprocessing)
        ↓
Style Dictionary Pipeline
        ↓
src/tokens/variables.css (Final CSS variables)
        ↓
React Components (Consumption)
```

---

## 🔧 Setup & Installation

### Dependencies

```json
{
  "dependencies": {
    "colorjs.io": "^0.5.2"
  },
  "devDependencies": {
    "@tokens-studio/sd-transforms": "^1.2.5",
    "style-dictionary": "^4.1.3"
  }
}
```

### Build Script

```json
{
  "scripts": {
    "build-tokens": "node config/build-tokens.js"
  }
}
```

---

## 📝 Token File Structure

### Input: `TDS Helper tokens.json`

Token Studio exports a **multi-theme JSON** with the following structure:

```json
{
  "core/color": { "tds": { ... } },
  "core/dimension": { "tds": { ... } },
  "core/font": { "tds": { ... } },
  "colors/tonies/default": { "tds": { ... } },      // ✅ We use this
  "colors/tonies/inverted": { "tds": { ... } },     // ❌ We skip this
  "colors/night-time-adventure/default": { "tds": { ... } }, // ❌ We skip this
  "styles/tonies/global/size": { "tds": { ... } },
  "styles/tonies/global/elevation": { "tds": { ... } },
  "styles/tonies/global/border": { "tds": { ... } },
  "styles/tonies/platform-web/typography": { "tds": { ... } },
  "$themes": [ ... ]
}
```

**IMPORTANT:** We **only** process the `colors/tonies/default` theme to avoid conflicts between light/dark themes.

---

## 🔄 Build Process

### Step 1: Theme Filtering

```javascript
// Only process DEFAULT theme (light mode)
const allowedCategories = [
  'core/color',
  'core/dimension', 
  'core/font',
  'colors/tonies/default',  // ✅ Only this theme
  'styles/tonies/global/size',
  'styles/tonies/global/elevation',
  'styles/tonies/global/border',
  'styles/tonies/platform-web/typography',
  'styles/tonies/platform-app/typography'
];
```

Explicitly **skip**:
- ❌ `colors/tonies/inverted` (dark theme)
- ❌ `colors/night-time-adventure/*` (other themes)
- ❌ Any theme with `/inverted` in the name

### Step 2: Token Merging

All `tds` objects from allowed categories are deep-merged into a single object:

```javascript
const merged = {};
for (const category in tokenData) {
  if (allowedCategories.includes(category)) {
    deepMerge(merged, tokenData[category].tds);
  }
}
const wrappedTokens = { tds: merged };
```

### Step 3: Border Token Fixing

Token Studio sometimes exports invalid border tokens with empty `width` or `style`. We fix these before Style Dictionary processes them:

```javascript
if (token.$type === 'border' && typeof token.$value === 'object') {
  const borderValue = token.$value;
  if (borderValue.width === '') borderValue.width = '0px';
  if (borderValue.style === '') borderValue.style = 'solid';
}
```

### Step 4: Style Dictionary Configuration

```javascript
import { register, expandTypesMap } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// Register Token Studio transforms
register(StyleDictionary, {
  'ts/color/modifiers': {
    format: 'hex', // Output color modifiers as hex
  },
});

const sd = new StyleDictionary({
  source: [tempTokenFile],
  preprocessors: ['tokens-studio'],
  expand: {
    typesMap: expandTypesMap, // Expand composite tokens
  },
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/tokens/',
      mathFractionDigits: 3,
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
      }],
    },
  },
});
```

### Step 5: Token Transformation

Style Dictionary applies the following transforms (via `tokens-studio` transform group):

| Transform | Purpose | Example |
|-----------|---------|---------|
| `ts/descriptionToComment` | Maps token descriptions to CSS comments | `/** background color */` |
| `ts/resolveMath` | Evaluates math expressions | `{base} * 2` → `calc(var(--base) * 2)` |
| `ts/size/px` | Adds `px` to unitless dimensions | `16` → `16px` |
| `ts/opacity` | Converts % to decimal | `50%` → `0.5` |
| `ts/size/lineheight` | Converts % line-height to unitless | `150%` → `1.5` |
| `ts/typography/fontWeight` | Converts names to numbers | `"Semi Bold"` → `600` |
| `ts/color/modifiers` | Resolves Token Studio color modifiers | `lighten(#D2000F, 0.2)` → `#a0000b` |
| `ts/size/css/letterspacing` | Converts % to em | `5%` → `0.05em` |
| `ts/color/css/hexrgba` | Converts rgba syntax | `rgba(#ABC, 0.5)` → `rgba(171, 193, 35, 0.5)` |
| `ts/shadow/innerShadow` | Converts innerShadow to inset | `"innerShadow"` → `"inset"` |
| `name/kebab` | Converts names to kebab-case | `surfaceMedium` → `surface-medium` |

### Step 6: Composite Token Expansion

Style Dictionary expands composite tokens into individual properties:

**Typography:**
```javascript
// Input
tds.typography.label.semibold.m = {
  fontFamily: "Wonder",
  fontWeight: "Semi Bold",
  fontSize: "18px",
  lineHeight: "1.3"
}

// Output
--tds-typography-label-semibold-m-font-family: Wonder;
--tds-typography-label-semibold-m-font-weight: 600;
--tds-typography-label-semibold-m-font-size: 18px;
--tds-typography-label-semibold-m-line-height: 1.3;
```

**Border:**
```javascript
// Input
tds.border.action.transparent = {
  color: "transparent",
  width: "2px",
  style: "solid"
}

// Output
--tds-border-action-transparent-color: transparent;
--tds-border-action-transparent-width: 2px;
--tds-border-action-transparent-style: solid;
```

**Box Shadow:**
```javascript
// Input (array of shadow objects)

// Output (single CSS box-shadow string)
--tds-elevation-shadow-m: 0px 4px 12px rgba(0, 0, 0, 0.12);
```

### Step 7: Font Face Generation

After Style Dictionary builds, we prepend `@font-face` declarations:

```javascript
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

for (const [name, weight] of Object.entries(fontWeights)) {
  fontFaces += `@font-face {
  font-family: 'Wonder';
  src: url('/wonder font/Wonder-${name}.ttf') format('truetype');
  font-weight: ${weight};
  font-style: normal;
  font-display: swap;
}`;
}
```

---

## 📤 Output: `src/tokens/variables.css`

### Token Naming Convention

All tokens follow **kebab-case** naming:

```css
/* ✅ CORRECT */
--tds-color-background-surface-medium: #ffffff;
--tds-spacing-container-1-5x: 24px;
--tds-border-radius-container-0-75x: 12px;

/* ❌ INCORRECT (old camelCase - don't use) */
--tds-color-background-surfaceMedium
--tds-spacing-container-1_5x
--tds-borderRadius-container-0_75x
```

### Token Categories

| Category | Example | Usage |
|----------|---------|-------|
| **Core Colors** | `--tds-core-color-primary-tonies-red-50` | Base color palette |
| **Semantic Colors** | `--tds-color-background-surface-medium` | Contextual colors |
| **Spacing** | `--tds-spacing-container-1-5x` | Padding, margin, gap |
| **Dimensions** | `--tds-dimension-element-height-2-5x` | Width, height, min/max |
| **Border Radius** | `--tds-border-radius-container-0-75x` | Corner rounding |
| **Typography** | `--tds-typography-label-semibold-m-font-size` | Text styling |
| **Border** | `--tds-border-action-transparent-width` | Border properties |
| **Elevation** | `--tds-elevation-shadow-m` | Box shadows |

---

## 🎨 Using Tokens in Components

### CSS Implementation

```css
/* ✅ CORRECT: Use tokens exclusively */
.button {
  background-color: var(--tds-color-element-primary-default);
  padding: var(--tds-spacing-container-0-63x) var(--tds-spacing-container-1x);
  border-radius: var(--tds-border-radius-container-0-75x);
  font-size: var(--tds-typography-label-semibold-sm-font-size);
  font-weight: var(--tds-typography-label-semibold-sm-font-weight);
}

/* ❌ WRONG: Hardcoded values */
.button {
  background-color: #D2000F;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
}
```

### Semantic vs Core Tokens

**ALWAYS prefer semantic tokens over core tokens:**

```css
/* ✅ BEST: Semantic tokens (contextual meaning) */
background-color: var(--tds-color-background-surface-medium);
color: var(--tds-color-foreground-default);

/* ⚠️ AVOID: Core tokens (no context) */
background-color: var(--tds-core-color-primary-canvas-chalkboard-100);
color: var(--tds-core-color-primary-canvas-chalkboard-0);
```

**Why?** Semantic tokens:
- Communicate intent and usage
- Can be themed without changing component code
- Are easier to maintain and understand

---

## 🔄 Rebuilding Tokens

### When to Rebuild

Rebuild tokens when:
- ✅ Token Studio JSON is updated
- ✅ New tokens are added
- ✅ Token values change
- ✅ Theme structure changes

### How to Rebuild

```bash
npm run build-tokens
```

This will:
1. Read `TDS Helper tokens.json`
2. Filter to DEFAULT theme only
3. Fix invalid border tokens
4. Run Style Dictionary transforms
5. Expand composite tokens
6. Generate `src/tokens/variables.css`
7. Prepend `@font-face` declarations

**The app will automatically reload** with new tokens (Vite HMR).

---

## 🚨 Common Issues & Solutions

### Issue 1: Token Name Mismatch

**Problem:** CSS shows `var(--tds-color-background-surfaceMedium)` but variable doesn't exist.

**Solution:** Style Dictionary uses **kebab-case**. Update to:
```css
var(--tds-color-background-surface-medium)
```

### Issue 2: Dark Theme Colors Appearing

**Problem:** Semantic colors don't match Figma (colors from INVERTED theme).

**Solution:** Ensure `build-tokens.js` **explicitly skips** inverted themes:
```javascript
if (category.includes('/inverted')) {
  continue; // Skip dark themes
}
```

### Issue 3: Typography Not Expanding

**Problem:** Typography tokens show `[object Object]` in CSS.

**Solution:** Ensure `expand.typesMap` uses Token Studio's `expandTypesMap`:
```javascript
expand: {
  typesMap: expandTypesMap, // From @tokens-studio/sd-transforms
}
```

### Issue 4: Color Modifiers Not Resolving

**Problem:** `ts/color/modifiers` not transforming `lighten`/`darken`/`alpha` modifiers.

**Solution:** Ensure the `tokens-studio` transform group is applied:
```javascript
platforms: {
  css: {
    transformGroup: 'tokens-studio', // This includes ts/color/modifiers
  }
}
```

### Issue 5: Math Expressions Not Calculating

**Problem:** Tokens like `{base} * 2` appear as-is instead of `calc()`.

**Solution:** The `ts/resolveMath` transform handles this automatically. If it's not working:
- Check that `transformGroup: 'tokens-studio'` is set
- Verify `mathFractionDigits` is configured if you need specific precision

### Issue 6: Font Weights Are Strings

**Problem:** Font weights are `"Semi Bold"` instead of `600`.

**Solution:** `ts/typography/fontWeight` transform handles this. Ensure it's included in the transform group.

---

## 📚 Reference Links

- [Style Dictionary Documentation](https://styledictionary.com/)
- [@tokens-studio/sd-transforms (npm)](https://www.npmjs.com/package/@tokens-studio/sd-transforms)
- [@tokens-studio/sd-transforms (GitHub)](https://github.com/tokens-studio/sd-transforms)
- [Token Studio Documentation](https://docs.tokens.studio/)
- [Token Studio - Transform Tokens with Style Dictionary](https://docs.tokens.studio/transform-tokens/style-dictionary)
- [ColorJS Documentation](https://colorjs.io/)

---

## 🎯 Quick Reference

### Token Rebuild Command
```bash
npm run build-tokens
```

### Token Naming Pattern
```
--tds-{category}-{subcategory}-{property}
```

### Always Use Semantic Tokens
```css
/* Backgrounds */
--tds-color-background-canvas
--tds-color-background-surface-medium
--tds-color-background-surface-subtle

/* Foreground/Text */
--tds-color-foreground-default
--tds-color-foreground-subtle
--tds-color-foreground-brand

/* Interactive Elements */
--tds-color-element-primary-default
--tds-color-element-primary-hover
--tds-color-element-primary-active
```

---

## ✅ Checklist for Token Updates

When updating tokens:

- [ ] Export updated JSON from Token Studio
- [ ] Replace `TDS Helper tokens.json`
- [ ] Run `npm run build-tokens`
- [ ] Verify `variables.css` was regenerated
- [ ] Check for console errors in browser
- [ ] Test affected components
- [ ] Commit both JSON and generated CSS
- [ ] Update this documentation if process changed

---

**Last Updated:** January 6, 2026  
**Style Dictionary Version:** 4.1.3  
**@tokens-studio/sd-transforms Version:** 1.2.5

