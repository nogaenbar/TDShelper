import React from 'react';
import './TokenSuggestions.css';

/**
 * TokenSuggestions Component
 * Displays AI-suggested tokens grouped by category
 */
export function TokenSuggestions({ suggestions = [] }) {
  if (!suggestions || suggestions.length === 0) return null;

  // Group suggestions by category
  const grouped = suggestions.reduce((acc, suggestion) => {
    const category = suggestion.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(suggestion);
    return acc;
  }, {});

  const handleCopyToken = (tokenName) => {
    navigator.clipboard.writeText(tokenName);
  };

  return (
    <div className="tds-token-suggestions">
      <h3 className="tds-token-suggestions__title">Suggested Tokens</h3>
      <div className="tds-token-suggestions__content">
        {Object.entries(grouped).map(([category, tokens]) => (
          <div key={category} className="tds-token-suggestions__category">
            <h4 className="tds-token-suggestions__category-title">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h4>
            <div className="tds-token-suggestions__tokens">
              {tokens.map((token, index) => (
                <div key={index} className="tds-token-suggestions__token">
                  <div className="tds-token-suggestions__token-header">
                    <code
                      className="tds-token-suggestions__token-name"
                      onClick={() => handleCopyToken(token.name)}
                      title="Click to copy"
                    >
                      {token.name}
                    </code>
                    {token.value && (
                      <span className="tds-token-suggestions__token-value">{token.value}</span>
                    )}
                  </div>
                  {token.description && (
                    <p className="tds-token-suggestions__token-description">{token.description}</p>
                  )}
                  {token.reasoning && (
                    <p className="tds-token-suggestions__token-reasoning">{token.reasoning}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenSuggestions;

