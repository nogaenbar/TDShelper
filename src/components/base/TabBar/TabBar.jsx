import React from 'react';
import './TabBar.css';

/**
 * TabBar Component
 * Horizontal tab navigation
 * Pixel-perfect from Figma design
 */
export function TabBar({ tabs = [], activeTab, onTabChange }) {
  return (
    <nav className="tds-tab-bar" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`tds-tab-bar__tab ${
              isActive ? 'tds-tab-bar__tab--active' : ''
            }`}
            onClick={() => onTabChange?.(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
          >
            <span className="tds-tab-bar__tab-text">{tab.label}</span>
            {isActive && <span className="tds-tab-bar__tab-indicator" aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;

