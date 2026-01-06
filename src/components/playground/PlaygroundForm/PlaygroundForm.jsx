import React from 'react';
import './PlaygroundForm.css';

/**
 * PlaygroundForm Component
 * Displays component requirements/specifications from AI analysis
 */
export function PlaygroundForm({ componentSpec }) {
  if (!componentSpec) return null;

  return (
    <div className="tds-playground-form">
      <h3 className="tds-playground-form__title">Component Requirements</h3>
      <div className="tds-playground-form__content">
        {componentSpec.name && (
          <div className="tds-playground-form__field">
            <label className="tds-playground-form__label">Component Name</label>
            <div className="tds-playground-form__value">{componentSpec.name}</div>
          </div>
        )}
        {componentSpec.category && (
          <div className="tds-playground-form__field">
            <label className="tds-playground-form__label">Category</label>
            <div className="tds-playground-form__value">{componentSpec.category}</div>
          </div>
        )}
        {componentSpec.platform && (
          <div className="tds-playground-form__field">
            <label className="tds-playground-form__label">Platform</label>
            <div className="tds-playground-form__value">{componentSpec.platform}</div>
          </div>
        )}
        {componentSpec.role && (
          <div className="tds-playground-form__field">
            <label className="tds-playground-form__label">Role / Purpose</label>
            <div className="tds-playground-form__value">{componentSpec.role}</div>
          </div>
        )}
        {componentSpec.interactions && (
          <div className="tds-playground-form__field">
            <label className="tds-playground-form__label">Key Interactions</label>
            <div className="tds-playground-form__value">{componentSpec.interactions}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaygroundForm;

