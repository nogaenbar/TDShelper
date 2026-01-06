import React from 'react';
import './ToggleTabBar.css';

/**
 * ToggleTabBar Component
 * Toggle between options (e.g., Web/App)
 * Pixel-perfect from Figma design 3968:532312
 * 
 * Uses exact tokens from Token Studio:
 * - height: tds.dimension.element.height.2_5x
 * - horizontalPadding: tds.spacing.container.0_75x
 * - borderRadius: tds.borderRadius.focus.pill
 * - typography: tds.typography.label.semibold.sm
 * - colors: tds.color.element.selectedPrimary / tertiary (default/hover/active)
 */
export function ToggleTabBar({ value, onChange, options = [] }) {
  return (
    <div className="tds-toggle-tab-bar">
      <div className="tds-toggle-tab-bar__container">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              className={`tds-toggle-tab-bar__tab ${
                isSelected ? 'tds-toggle-tab-bar__tab--selected' : ''
              }`}
              onClick={() => onChange?.(option.value)}
              aria-selected={isSelected}
              aria-label={option.label}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToggleTabBar;

