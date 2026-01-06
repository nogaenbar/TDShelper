import React from 'react';
import './ComponentList.css';

/**
 * ComponentList Component
 * Displays list of components with selection state, organized by category
 */
export function ComponentList({
  components = [],
  selectedComponent,
  onSelectComponent,
}) {
  // Group components by category
  const baseComponents = components.filter(c => c.category === 'base');
  const patternComponents = components.filter(c => c.category === 'pattern');
  const subcomponents = components.filter(c => c.category === 'subcomponent');
  
  const renderComponentItem = (component) => {
    const isSelected = selectedComponent?.id === component.id;
    return (
      <button
        key={component.id}
        className={`tds-component-list__item ${
          isSelected ? 'tds-component-list__item--selected' : ''
        }`}
        onClick={() => onSelectComponent?.(component)}
        aria-selected={isSelected}
      >
        <span className="tds-component-list__item-text">
          {component.name}
        </span>
      </button>
    );
  };

  return (
    <div className="tds-component-list">
      <div className="tds-component-list__items">
        {components.length === 0 ? (
          <div className="tds-component-list__empty">
            <p>No components found</p>
          </div>
        ) : (
          <>
            {/* Base Components Section */}
            {baseComponents.length > 0 && (
              <>
                <div className="tds-component-list__header">
                  <span className="tds-component-list__header-text">Base Components</span>
                </div>
                {baseComponents.map(renderComponentItem)}
              </>
            )}
            
            {/* Pattern Components Section */}
            {patternComponents.length > 0 && (
              <>
                <div className="tds-component-list__header">
                  <span className="tds-component-list__header-text">Pattern Components</span>
                </div>
                {patternComponents.map(renderComponentItem)}
              </>
            )}
            
            {/* Subcomponents Section */}
            {subcomponents.length > 0 && (
              <>
                <div className="tds-component-list__header">
                  <span className="tds-component-list__header-text">Subcomponents</span>
                </div>
                {subcomponents.map(renderComponentItem)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ComponentList;

