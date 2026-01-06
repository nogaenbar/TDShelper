# TDS Helper - Design System Component Library

Component workshop and design system helper for building production-ready components.

## Features

- 🎨 Token-based design system
- 🔧 Component workshop UI
- 📦 Built with React + Vite
- 🎯 Pixel-perfect Figma integration
- ♿ WCAG AA accessible

## Getting Started

```bash
# Install dependencies
npm install

# Build design tokens
npm run build-tokens

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── base/          # Core UI components
│   ├── layout/        # Layout components
│   └── workshop/      # Workshop-specific components
├── styles/            # Global styles
├── tokens/            # Generated design tokens
└── utils/             # Utility functions
```

## Design Tokens

All styles use semantic tokens from `src/tokens/variables.css`. Never use hardcoded values.

To regenerate tokens from Token Studio JSON:
```bash
npm run build-tokens
```

## License

Proprietary

