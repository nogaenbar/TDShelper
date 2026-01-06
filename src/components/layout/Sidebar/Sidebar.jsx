import React, { useState } from 'react';
import './Sidebar.css';
// Button import removed - not used in Sidebar
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
            Build production-ready components for TDS design system
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
    </aside>
  );
}

export default Sidebar;

