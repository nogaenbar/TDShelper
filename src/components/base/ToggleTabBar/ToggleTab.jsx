import React, { forwardRef } from 'react';
import './ToggleTab.css';

/**
 * ToggleTab Component
 * Child component of ToggleTabBar for individual tab items
 * 
 * @param {Object} props
 * @param {string} props.value - Tab value
 * @param {string} props.label - Tab label text
 * @param {boolean} props.isSelected - Whether the tab is currently selected
 * @param {Function} props.onClick - Click handler
 */
export const ToggleTab = forwardRef(function ToggleTab({ value, label, isSelected, onClick }, ref) {
  return (
    <button
      ref={ref}
      className={`tds-toggle-tab-bar__tab ${
        isSelected ? 'tds-toggle-tab-bar__tab--selected' : ''
      }`}
      onClick={onClick}
      aria-selected={isSelected}
      aria-label={label}
    >
      {label}
    </button>
  );
});

export default ToggleTab;

