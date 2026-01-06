import React, { useState, useMemo } from 'react';
import './PreviewTab.css';
import { PropertiesTable } from '../PropertiesTable';

/**
 * PreviewTab Component
 * Main preview area showing component variants and properties
 * Pixel-perfect from Figma design
 */
export function PreviewTab({ component, platform = 'web' }) {
  // State for interactive component properties
  const [interactiveProps, setInteractiveProps] = useState(() => {
    if (!component?.properties) return {};
    const defaults = {};
    component.properties.forEach(prop => {
      if (prop.default !== undefined) {
        // Parse default values
        if (prop.default === 'false' || prop.default === 'true') {
          defaults[prop.name] = prop.default === 'true';
        } else if (prop.default.startsWith("'") && prop.default.endsWith("'")) {
          defaults[prop.name] = prop.default.slice(1, -1);
        } else if (prop.default === "''") {
          defaults[prop.name] = '';
        } else if (prop.default === 'undefined') {
          // Skip undefined props
        } else if (prop.default.startsWith('[') && prop.default.endsWith(']')) {
          // Try to parse array defaults (simple case)
          try {
            defaults[prop.name] = JSON.parse(prop.default);
          } catch (e) {
            // If parsing fails, skip
          }
        } else {
          defaults[prop.name] = prop.default;
        }
      }
    });
    // Set default children for button
    if (component.id === 'tds-text-button') {
      defaults.children = 'Button';
    }
    // Set default value for ToggleTabBar
    if (component.id === 'toggle-tab-bar') {
      defaults.value = 'web';
      defaults.options = [
        { value: 'web', label: 'Web' },
        { value: 'app', label: 'App' },
      ];
    }
    // Set default tabs for TdsTabBar
    if (component.id === 'tds-tab-bar') {
      defaults.tabs = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
        { id: 'tab3', label: 'Tab 3' },
      ];
      defaults.activeTab = 'tab1';
    }
    return defaults;
  });
  
  if (!component) {
    return (
      <div className="tds-preview-tab">
        <div className="tds-preview-tab__empty">
          <p>Select a component to preview</p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (propertyName, value) => {
    setInteractiveProps(prev => ({
      ...prev,
      [propertyName]: value
    }));
  };

  // Render interactive components for button variants (primary, secondary, tertiary)
  const interactiveComponents = useMemo(() => {
    if (!component?.renderPreview) return null;
    
    // For button component, render all three variants side by side
    if (component.id === 'tds-text-button') {
      const variants = ['primary', 'secondary', 'tertiary'];
      return variants.map(variant => {
        const mockVariant = {
          name: 'Interactive Example',
          props: { ...interactiveProps, variant }
        };
        return {
          variant,
          element: component.renderPreview(mockVariant, interactiveProps)
        };
      });
    }
    
    // For ToggleTabBar, make it fully interactive
    if (component.id === 'toggle-tab-bar') {
      const mockVariant = {
        name: 'Interactive Example',
        props: {}
      };
      // Pass onChange handler to update state
      const propsWithHandler = {
        ...interactiveProps,
        onChange: (value) => {
          handlePropertyChange('value', value);
        }
      };
      return component.renderPreview(mockVariant, propsWithHandler);
    }
    
    // For TdsTabBar, make it fully interactive
    if (component.id === 'tds-tab-bar') {
      const mockVariant = {
        name: 'Interactive Example',
        props: {}
      };
      // Pass onTabChange handler to update state
      const propsWithHandler = {
        ...interactiveProps,
        onTabChange: (tabId) => {
          handlePropertyChange('activeTab', tabId);
        }
      };
      return component.renderPreview(mockVariant, propsWithHandler);
    }
    
    // For other components, render single interactive example
    const mockVariant = {
      name: 'Interactive Example',
      props: { ...interactiveProps }
    };
    return component.renderPreview(mockVariant, interactiveProps);
  }, [component, interactiveProps]);

  return (
    <div className="tds-preview-tab" data-node-id="8164:14123">
      <div className="tds-preview-tab__container" data-node-id="8164:14124">
        {/* Platform Indicator */}
        <div className="tds-preview-tab__platform-indicator" data-node-id="8164:14125">
          <span 
            className="tds-preview-tab__platform-dot"
            aria-hidden="true"
          />
          <span className="tds-preview-tab__platform-text">{platform === 'web' ? 'Web' : 'App'}</span>
        </div>

        {/* Interactive Example Section */}
        <div className="tds-preview-tab__section" data-node-id="8164:14129">
          <h3 className="tds-preview-tab__section-title" data-node-id="8164:14131">Interactive Example</h3>
          <div className="tds-preview-tab__interactive-example">
            {Array.isArray(interactiveComponents) ? (
              <div className="tds-preview-tab__button-variants">
                {interactiveComponents.map(({ variant, element }) => (
                  <div key={variant} className="tds-preview-tab__button-variant-item">
                    <div className="tds-preview-tab__button-variant-label">
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </div>
                    {element}
                  </div>
                ))}
              </div>
            ) : interactiveComponents ? (
              interactiveComponents
            ) : (
              <div className="tds-preview-tab__empty-section">
                <p>Component preview will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Properties Section */}
        <div className="tds-preview-tab__section" data-node-id="8164:14151">
          <h3 className="tds-preview-tab__section-title" data-node-id="8164:14153">Properties</h3>
          <PropertiesTable 
            properties={component.properties || []} 
            interactiveProps={interactiveProps}
            onPropertyChange={handlePropertyChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewTab;

