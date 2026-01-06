import React from 'react';
import './ComponentList.css';

/**
 * ComponentList Component
 * Displays list of components with selection state
 */
export function ComponentList({
  components = [],
  selectedComponent,
  onSelectComponent,
}) {
  return (
    <div className="tds-component-list">
      {/* Component Items */}
      <div className="tds-component-list__items">
        {components.length === 0 ? (
          <div className="tds-component-list__empty">
            <p>No components found</p>
          </div>
        ) : (
          components.map((component) => {
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
          })
        )}
      </div>
    </div>
  );
}

export default ComponentList;

