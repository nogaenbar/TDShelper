# TdsTabBar Component Design Analysis

## Quick Reference Summary

### Key Token Mappings
- **Height**: `--tds-dimension-element-height-3x` (48px)
- **Typography**: `--tds-typography-label-semibold-s-*` (14px, 600 weight)
- **Unselected States**: `--tds-color-element-tertiary-*` tokens
- **Selected State**: `--tds-color-element-selected-neutral-*` tokens (semantic: "selected")
- **Selected Indicator**: `--tds-border-action-selected-*` (composite: #d2000f, 2px, solid)
- **Container Bottom Border**: `--tds-border-action-subtle-*` (composite: #33333329, 1px, solid)
- **Focus**: `--tds-color-border-focus` (#0099ff), `--tds-border-radius-focus-0-44x` (7px)

## Component Overview
**Figma Links:**
- TdsTabBar: https://www.figma.com/design/wzakVVLaku5OGvHKzAw06b/%F0%9F%A7%A9-TDS-Components?node-id=3873-1423
- .Tab (Child Component): https://www.figma.com/design/wzakVVLaku5OGvHKzAw06b/%F0%9F%A7%A9-TDS-Components?node-id=3757-1005

---

## TdsTabBar Container

### Layout & Structure
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Display** | `flex` | - | `display: flex;` |
| **Flex Direction** | `row` (horizontal) | - | `flex-direction: row;` |
| **Align Items** | `flex-start` | - | `align-items: flex-start;` |
| **Height** | `48px` | `tds.dimension.element.height.3x` | `var(--tds-dimension-element-height-3x)` |
| **Width** | `375px` (example) | Auto/100% | `width: 100%;` or `width: auto;` |
| **Background** | `transparent` | - | `background-color: transparent;` |
| **Position** | `relative` | - | `position: relative;` |

### Bottom Border Line (Container) - Composite Token
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Position** | `absolute`, `bottom: 0` | - | `position: absolute; bottom: 0;` |
| **Border** | Composite token | `tds.border.action.subtle` | See below |
| **Border Color** | `#33333329` | `tds.border.action.subtle.color` | `var(--tds-border-action-subtle-color)` |
| **Border Width** | `1px` | `tds.border.action.subtle.width` | `var(--tds-border-action-subtle-width)` |
| **Border Style** | `solid` | `tds.border.action.subtle.style` | `var(--tds-border-action-subtle-style)` |

---

## .Tab Child Component

### Layout & Dimensions
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Height** | `48px` | `tds.dimension.element.height.3x` | `var(--tds-dimension-element-height-3x)` |
| **Min Width** | `64px` | `tds.dimension.element.width.4x` | `var(--tds-dimension-element-width-4x)` |
| **Padding Horizontal** | `16px` | `tds.spacing.container.1x` | `var(--tds-spacing-container-1x)` |
| **Padding Vertical** | `0px` | `tds.spacing.container.none` | `var(--tds-spacing-container-none)` |
| **Display** | `flex` | - | `display: flex;` |
| **Flex Direction** | `column` | - | `flex-direction: column;` |
| **Align Items** | `center` | - | `align-items: center;` |
| **Justify Content** | `center` | - | `justify-content: center;` |
| **Background** | `transparent` | - | `background-color: transparent;` |
| **Position** | `relative` | - | `position: relative;` |
| **Cursor** | `pointer` | - | `cursor: pointer;` |

### Typography
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Font Family** | `Wonder` | `tds.typography.label.semibold.s.fontFamily` | `var(--tds-typography-label-semibold-s-font-family)` |
| **Font Weight** | `Semi_Bold` (600) | `tds.typography.label.semibold.s.fontWeight` | `var(--tds-typography-label-semibold-s-font-weight)` |
| **Font Size** | `14px` | `tds.typography.label.semibold.s.fontSize` | `var(--tds-typography-label-semibold-s-font-size)` |
| **Line Height** | `1.5` (21px) | `tds.typography.label.semibold.s.lineHeight` | `var(--tds-typography-label-semibold-s-line-height)` |
| **Text Align** | `center` | - | `text-align: center;` |
| **White Space** | `nowrap` | - | `white-space: nowrap;` |

---

## .Tab States

### 1. Initial State (Unselected, Default)
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Background** | `transparent` | `tds.color.element.tertiary.default` | `var(--tds-color-element-tertiary-default)` |
| **Text Color** | `#333333` | `tds.color.element.tertiary.onTertiary` | `var(--tds-color-element-tertiary-on-tertiary)` |

### 2. Hover State (Unselected)
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Background** | `rgba(143,143,143,0.12)` | `tds.color.element.tertiary.hover` | `var(--tds-color-element-tertiary-hover)` |
| **Text Color** | `#333333` | `tds.color.element.tertiary.onTertiary` | `var(--tds-color-element-tertiary-on-tertiary)` |

### 3. Active State (Unselected, Pressed)
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Background** | `rgba(143,143,143,0.24)` | `tds.color.element.tertiary.active` | `var(--tds-color-element-tertiary-active)` |
| **Text Color** | `#333333` | `tds.color.element.tertiary.onTertiary` | `var(--tds-color-element-tertiary-on-tertiary)` |

### 4. Selected State
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Background** | `transparent` | `tds.color.element.selectedNeutral.default` | `var(--tds-color-element-selected-neutral-default)` |
| **Text Color** | `#d2000f` | `tds.color.element.selectedNeutral.onSelectedNeutral` | `var(--tds-color-element-selected-neutral-on-selected-neutral)` |
| **Indicator Border** | Composite token | `tds.border.action.selected` | See below |

### 5. Disabled State
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Background** | `transparent` | `tds.color.element.tertiary.default` | `var(--tds-color-element-tertiary-default)` |
| **Text Color** | `#8f8f8f` | `tds.color.element.disabled.onDisabled` | `var(--tds-color-element-disabled-on-disabled)` |
| **Cursor** | `not-allowed` | - | `cursor: not-allowed;` |

---

## Selected Tab Indicator

### Indicator Line (Bottom Border) - Composite Token
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Position** | `absolute`, `bottom: 0` | - | `position: absolute; bottom: 0;` |
| **Width** | `100%` (full tab width) | - | `width: 100%;` |
| **Border** | Composite token | `tds.border.action.selected` | See below |
| **Border Color** | `#d2000f` | `tds.border.action.selected.color` | `var(--tds-border-action-selected-color)` |
| **Border Width** | `2px` | `tds.border.action.selected.width` | `var(--tds-border-action-selected-width)` |
| **Border Style** | `solid` | `tds.border.action.selected.style` | `var(--tds-border-action-selected-style)` |
| **Left/Right** | `0` | - | `left: 0; right: 0;` |

---

## Focus State

### Focus Ring
| Property | Figma Value | Token Mapping | CSS Variable |
|----------|-------------|---------------|--------------|
| **Border Width** | `2px` | `tds.border.width.base.m` | `var(--tds-border-width-base-m)` |
| **Border Color** | `#0099ff` | `tds.color.border.focus` | `var(--tds-color-border-focus)` |
| **Border Style** | `solid` | - | `border-style: solid;` |
| **Border Radius** | `7px` | `tds.borderRadius.focus.0_44x` | `var(--tds-border-radius-focus-0-44x)` |
| **Offset** | `2px` (inset) | - | `outline-offset: 2px;` or `inset: 0 2px;` |

---

## Component Descriptions from Figma

### .Tab Component Description
> "Element to design a tab bar."

### State Descriptions
- **State=Selected, Selected=true**: "background color for selected elements (e.g buttons)"
- **State=Initial, Selected=false**: "background default color for tertiary interactive elements (e.g buttons)"
- **State=Active, Selected=false**: "Background active color for tertiary interactive elements (e.g buttons) * This color references the primary default interaction color and adds a modifier on it to make it darker."
- **State=Hover, Selected=false**: "Background hover color for tertiary interactive elements (e.g buttons) * This color references the primary default interaction color and adds a modifier on it to make it darker."
- **State=Disabled, Selected=false**: "background default color for tertiary interactive elements (e.g buttons)"

---

## Token Mapping Summary

### ✅ Confirmed Token Mappings

1. **Height**: `--tds-dimension-element-height-3x` (48px)
2. **Min Width**: `--tds-dimension-element-width-4x` (64px)
3. **Horizontal Padding**: `--tds-spacing-container-1x` (16px)
4. **Typography**: `--tds-typography-label-semibold-s-*` (14px, 600 weight)
5. **Tertiary Colors (Unselected)**:
   - Default: `--tds-color-element-tertiary-default` (transparent)
   - Hover: `--tds-color-element-tertiary-hover` (rgba(143,143,143,0.12))
   - Active: `--tds-color-element-tertiary-active` (rgba(143,143,143,0.24))
   - Text: `--tds-color-element-tertiary-on-tertiary` (#333333)
6. **Selected State** (Semantic: `selectedNeutral`):
   - Background: `--tds-color-element-selected-neutral-default` (transparent)
   - Text: `--tds-color-element-selected-neutral-on-selected-neutral` (#d2000f)
   - Indicator Border: `--tds-border-action-selected-*` (composite: #d2000f, 2px, solid)
7. **Disabled State**:
   - Text: `--tds-color-element-disabled-on-disabled` (#8f8f8f)
8. **Border Widths**:
   - Indicator: `--tds-border-width-base-m` (2px)
9. **Focus**:
   - Border: `--tds-color-border-focus` (#0099ff)
   - Border Radius: `--tds-border-radius-focus-0-44x` (7px)

### ✅ All Tokens Verified

1. **Container Bottom Border**: `--tds-border-action-subtle-*` (composite: #33333329, 1px, solid)

---

## Implementation Notes

1. **Semantic Token Logic**: Always use semantic tokens that match the state/context:
   - **Unselected tabs**: Use `tertiary` tokens (default interactive elements)
   - **Selected tabs**: Use `selectedNeutral` tokens (selected elements)
   - **Borders**: Use composite `border.action.*` tokens (semantic border tokens)

2. The tab bar container has a bottom border line (`tds.border.action.subtle`) that spans the full width, with the selected tab's indicator (`tds.border.action.selected`) overlaying it.

3. The selected tab indicator uses the composite `tds.border.action.selected` token (2px, #d2000f, solid) positioned absolutely at the bottom of the tab.

4. Focus state uses a blue outline with 2px offset and rounded corners.

5. The component should be fully accessible with proper ARIA attributes (`role="tablist"`, `role="tab"`, `aria-selected`, etc.).

