import React from 'react';
import './AccessibilityTab.css';

/**
 * AccessibilityTab Component
 * Displays accessibility information for components
 */
export function AccessibilityTab({ component }) {
  if (!component) {
    return (
      <div className="tds-accessibility-tab">
        <div className="tds-accessibility-tab__empty">
          <p>No component selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tds-accessibility-tab">
      <h3 className="tds-accessibility-tab__title">Accessibility Information</h3>
      
      {component.accessibility ? (
        <div className="tds-accessibility-tab__content">
          <div className="tds-accessibility-tab__section">
            <h4 className="tds-accessibility-tab__section-title">ARIA Label</h4>
            <p className="tds-accessibility-tab__text">{component.accessibility.ariaLabel}</p>
          </div>
          
          <div className="tds-accessibility-tab__section">
            <h4 className="tds-accessibility-tab__section-title">Keyboard Navigation</h4>
            <p className="tds-accessibility-tab__text">{component.accessibility.keyboardNavigation}</p>
          </div>
          
          <div className="tds-accessibility-tab__section">
            <h4 className="tds-accessibility-tab__section-title">Screen Reader Support</h4>
            <p className="tds-accessibility-tab__text">{component.accessibility.screenReaderSupport}</p>
          </div>
          
          <div className="tds-accessibility-tab__section">
            <h4 className="tds-accessibility-tab__section-title">Color Contrast</h4>
            <p className="tds-accessibility-tab__text">{component.accessibility.colorContrast}</p>
          </div>
        </div>
      ) : (
        <div className="tds-accessibility-tab__empty">
          <p>No accessibility information available</p>
        </div>
      )}
    </div>
  );
}

export default AccessibilityTab;

