import React from 'react';
import './FigmaIntegration.css';

/**
 * FigmaIntegration Component
 * Displays Figma design information and analysis
 */
export function FigmaIntegration({ figmaData }) {
  if (!figmaData) return null;

  return (
    <div className="tds-figma-integration">
      <h3 className="tds-figma-integration__title">Figma Design</h3>
      <div className="tds-figma-integration__content">
        {figmaData.url && (
          <div className="tds-figma-integration__field">
            <label className="tds-figma-integration__label">Figma URL</label>
            <a
              href={figmaData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tds-figma-integration__link"
            >
              {figmaData.url}
            </a>
          </div>
        )}
        {figmaData.screenshot && (
          <div className="tds-figma-integration__field">
            <label className="tds-figma-integration__label">Design Preview</label>
            <div className="tds-figma-integration__preview">
              <img
                src={figmaData.screenshot}
                alt="Figma design preview"
                className="tds-figma-integration__image"
              />
            </div>
          </div>
        )}
        {figmaData.analysis && (
          <div className="tds-figma-integration__field">
            <label className="tds-figma-integration__label">Design Analysis</label>
            <div className="tds-figma-integration__analysis">{figmaData.analysis}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FigmaIntegration;

