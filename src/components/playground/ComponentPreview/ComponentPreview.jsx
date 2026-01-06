import React, { useState } from 'react';
import './ComponentPreview.css';

/**
 * ComponentPreview Component
 * Displays generated component code and live preview
 */
export function ComponentPreview({ code }) {
  const [activeTab, setActiveTab] = useState('preview');

  if (!code) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code.jsx || code.css || '');
  };

  return (
    <div className="tds-component-preview">
      <div className="tds-component-preview__header">
        <h3 className="tds-component-preview__title">Generated Component</h3>
        <div className="tds-component-preview__tabs">
          <button
            className={`tds-component-preview__tab ${
              activeTab === 'preview' ? 'tds-component-preview__tab--active' : ''
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button
            className={`tds-component-preview__tab ${
              activeTab === 'code' ? 'tds-component-preview__tab--active' : ''
            }`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>
      </div>

      <div className="tds-component-preview__content">
        {activeTab === 'preview' && (
          <div className="tds-component-preview__preview-area">
            {code.preview ? (
              <div dangerouslySetInnerHTML={{ __html: code.preview }} />
            ) : (
              <p className="tds-component-preview__empty">Preview not available</p>
            )}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="tds-component-preview__code-area">
            <div className="tds-component-preview__code-header">
              <span className="tds-component-preview__code-label">Component Code</span>
              <button
                className="tds-component-preview__copy-button"
                onClick={handleCopyCode}
              >
                Copy
              </button>
            </div>
            <pre className="tds-component-preview__code">
              <code>{code.jsx || code.css || 'No code available'}</code>
            </pre>
            {code.css && (
              <>
                <div className="tds-component-preview__code-header">
                  <span className="tds-component-preview__code-label">CSS Styles</span>
                  <button
                    className="tds-component-preview__copy-button"
                    onClick={() => navigator.clipboard.writeText(code.css)}
                  >
                    Copy
                  </button>
                </div>
                <pre className="tds-component-preview__code">
                  <code>{code.css}</code>
                </pre>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComponentPreview;

