import React, { useState } from 'react';
import './Playground.css';
import { PlaygroundForm } from '../PlaygroundForm';
import { FigmaIntegration } from '../FigmaIntegration';
import { TokenSuggestions } from '../TokenSuggestions';
import { ComponentPreview } from '../ComponentPreview';

/**
 * Playground Component
 * Main container for component ideation playground
 * Displays results from AI conversations in Cursor
 */
export function Playground() {
  // State for playground data (populated from AI results)
  const [componentSpec, setComponentSpec] = useState(null);
  const [figmaData, setFigmaData] = useState(null);
  const [tokenSuggestions, setTokenSuggestions] = useState([]);
  const [generatedCode, setGeneratedCode] = useState(null);

  return (
    <div className="tds-playground">
      <div className="tds-playground__container">
        {/* Header */}
        <div className="tds-playground__header">
          <h2 className="tds-playground__title">Component Playground</h2>
          <p className="tds-playground__subtitle">
            View AI-generated component specifications, token suggestions, and code
          </p>
        </div>

        {/* Content Sections */}
        <div className="tds-playground__content">
          {/* Component Requirements */}
          {componentSpec && (
            <section className="tds-playground__section">
              <PlaygroundForm componentSpec={componentSpec} />
            </section>
          )}

          {/* Figma Integration */}
          {figmaData && (
            <section className="tds-playground__section">
              <FigmaIntegration figmaData={figmaData} />
            </section>
          )}

          {/* Token Suggestions */}
          {tokenSuggestions.length > 0 && (
            <section className="tds-playground__section">
              <TokenSuggestions suggestions={tokenSuggestions} />
            </section>
          )}

          {/* Component Preview */}
          {generatedCode && (
            <section className="tds-playground__section">
              <ComponentPreview code={generatedCode} />
            </section>
          )}

          {/* Empty State */}
          {!componentSpec && !figmaData && tokenSuggestions.length === 0 && !generatedCode && (
            <div className="tds-playground__empty">
              <p className="tds-playground__empty-text">
                Start a conversation in Cursor to ideate a new component. Results will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Playground;

