import React from 'react';
import './Tab.css';

/**
 * Tab Component
 * Child component of TdsTabBar for individual tab items
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the tab
 * @param {string} props.label - Tab label text
 * @param {boolean} props.isActive - Whether the tab is currently active
 * @param {boolean} props.disabled - Whether the tab is disabled
 * @param {Function} props.onClick - Click handler
 */
export function Tab({ id, label, isActive, disabled, onClick }) {
  return (
    <button
      className={`tds-tab-bar__tab ${
        isActive ? 'tds-tab-bar__tab--active' : ''
      } ${disabled ? 'tds-tab-bar__tab--disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      aria-controls={`tabpanel-${id}`}
      id={`tab-${id}`}
    >
      <span className="tds-tab-bar__tab-text">{label}</span>
      {isActive && <span className="tds-tab-bar__tab-indicator" aria-hidden="true" />}
    </button>
  );
}

export default Tab;

