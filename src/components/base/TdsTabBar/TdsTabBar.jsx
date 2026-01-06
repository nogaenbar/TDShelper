import React from 'react';
import './TdsTabBar.css';
import './Tab.css';
import { Tab } from './Tab';

/**
 * TdsTabBar Component
 * Horizontal tab navigation component with Tab subcomponents
 * Pixel-perfect from Figma design
 * 
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects with { id, label }
 * @param {string} props.activeTab - Currently active tab ID
 * @param {Function} props.onTabChange - Callback when tab changes
 */
export function TdsTabBar({ tabs = [], activeTab, onTabChange }) {
  return (
    <nav className="tds-tab-bar" role="tablist">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => onTabChange?.(tab.id)}
        />
      ))}
    </nav>
  );
}

// Export Tab as a static property for composition
TdsTabBar.Tab = Tab;

export default TdsTabBar;
