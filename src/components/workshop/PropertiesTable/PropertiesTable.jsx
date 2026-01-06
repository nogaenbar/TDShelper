import React from 'react';
import './PropertiesTable.css';

/**
 * PropertiesTable Component
 * Displays component properties in a table format with interactive dropdowns
 * Pixel-perfect from Figma design - uses CODE blocks, not badges
 */
export function PropertiesTable({ 
  properties = [], 
  interactiveProps = {},
  onPropertyChange = () => {}
}) {
  if (!properties || properties.length === 0) {
    return (
      <div className="tds-properties-table">
        <div className="tds-properties-table__empty">
          <p>No properties defined</p>
        </div>
      </div>
    );
  }

  // Extract options from type string (e.g., "'primary' | 'secondary' | 'tertiary'")
  const getOptionsFromType = (type, propName) => {
    if (!type) return null;
    
    // Skip interactive controls for function props
    if (propName === 'onClick' || type.includes('=>') || type.includes('void')) {
      return null;
    }
    
    // Match union types like "'primary' | 'secondary' | 'tertiary'"
    const unionMatch = type.match(/'([^']+)'/g);
    if (unionMatch) {
      return unionMatch.map(m => m.slice(1, -1));
    }
    
    // Match boolean
    if (type === 'boolean') {
      return ['true', 'false'];
    }
    
    // For string types (including React.ReactNode for children), allow text input
    if (type === 'string' || type.includes('React.ReactNode')) {
      return 'text'; // Special marker for text input
    }
    
    return null;
  };

  const getCurrentValue = (prop) => {
    const value = interactiveProps[prop.name];
    if (value === undefined || value === null) {
      return prop.default;
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    }
    return String(value);
  };

  const handleChange = (prop, newValue) => {
    let parsedValue = newValue;
    
    // Parse value based on type
    if (prop.type === 'boolean') {
      parsedValue = newValue === 'true';
    } else if (prop.type.includes("'") && prop.type.includes('|')) {
      // It's a union type, keep as string
      parsedValue = newValue;
    } else if (prop.type === 'string') {
      parsedValue = newValue;
    }
    
    onPropertyChange(prop.name, parsedValue);
  };

  return (
    <div className="tds-properties-table">
      <div className="tds-properties-table__container">
        <table className="tds-properties-table__table">
          <thead className="tds-properties-table__header">
            <tr className="tds-properties-table__header-row">
              <th className="tds-properties-table__header-cell">Property</th>
              <th className="tds-properties-table__header-cell">Type</th>
              <th className="tds-properties-table__header-cell">Value</th>
              <th className="tds-properties-table__header-cell">Description</th>
            </tr>
          </thead>
          <tbody className="tds-properties-table__body">
            {properties.map((prop, index) => {
              const options = getOptionsFromType(prop.type, prop.name);
              const isSelect = options && Array.isArray(options) && options.length > 0;
              const isTextInput = options === 'text';
              const currentValue = getCurrentValue(prop);
              
              return (
                <tr key={prop.name || index} className="tds-properties-table__row">
                  <td className="tds-properties-table__cell">
                    {prop.name && (
                      <code className="tds-properties-table__property-name">{prop.name}</code>
                    )}
                  </td>
                  <td className="tds-properties-table__cell">
                    {prop.type && (
                      <span className="tds-properties-table__type">{prop.type}</span>
                    )}
                  </td>
                  <td className="tds-properties-table__cell">
                    {isSelect ? (
                      <select
                        id={`property-${prop.name}-${index}`}
                        name={prop.name}
                        className="tds-properties-table__select"
                        value={currentValue}
                        onChange={(e) => handleChange(prop, e.target.value)}
                        aria-label={`Change ${prop.name} property`}
                      >
                        {options.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : isTextInput ? (
                      <input
                        id={`property-${prop.name}-${index}`}
                        name={prop.name}
                        type="text"
                        className="tds-properties-table__input"
                        value={currentValue || ''}
                        onChange={(e) => handleChange(prop, e.target.value)}
                        placeholder={prop.default || ''}
                        aria-label={`Change ${prop.name} property`}
                      />
                    ) : (
                      <code className="tds-properties-table__default">
                        {String(currentValue)}
                      </code>
                    )}
                  </td>
                  <td className="tds-properties-table__cell">
                    <span className="tds-properties-table__description">
                      {prop.description || 'Some description'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertiesTable;

