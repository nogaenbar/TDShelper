import React, { useState } from 'react';
import './Sidebar.css';
import { Button } from '../../base/Button';
import { ComponentList } from '../../workshop/ComponentList';

/**
 * Sidebar Component
 * Left navigation sidebar for TDS Helper
 * Pixel-perfect from Figma design
 */
export function Sidebar({ 
  components = [],
  selectedComponent,
  onSelectComponent,
  onNewComponent 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = components.filter(comp =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="tds-sidebar" data-node-id="8164:14091">
      {/* Header Section */}
      <div className="tds-sidebar__header" data-node-id="8164:14092">
        <div className="tds-sidebar__header-content">
          <h1 className="tds-sidebar__title" data-node-id="8164:14094">Component Workshop</h1>
          <p className="tds-sidebar__description" data-node-id="8164:14096">
            Build production-ready components for your design system
          </p>
        </div>
      </div>

      {/* Component List Section */}
      <div className="tds-sidebar__component-list-wrapper" data-node-id="8164:14097">
        <ComponentList
          components={filteredComponents}
          selectedComponent={selectedComponent}
          onSelectComponent={onSelectComponent}
        />
      </div>

      {/* New Component Button */}
      <div className="tds-sidebar__new-component-action" data-node-id="8164:14108">
        <Button
          variant="primary"
          size="medium"
          onClick={onNewComponent}
        >
          <span>New Component</span>
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M10 4V16M4 10H16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;

