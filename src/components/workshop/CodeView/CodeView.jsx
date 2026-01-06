import React from 'react';
import './CodeView.css';

/**
 * CodeView Component
 * Displays component source code
 */
export function CodeView({ component }) {
  if (!component || !component.code) {
    return (
      <div className="tds-code-view">
        <div className="tds-code-view__empty">
          <p>No code available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tds-code-view">
      <pre className="tds-code-view__code">
        <code>{component.code}</code>
      </pre>
    </div>
  );
}

export default CodeView;

