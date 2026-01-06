import React from 'react';
import './Badge.css';

/**
 * Badge Component
 * Small label/badge for displaying categories, status, etc.
 * Uses tokens from variables.css
 */
export function Badge({ 
  children, 
  variant = 'info',
  size = 'medium',
  className = '' 
}) {
  const classes = [
    'tds-badge',
    `tds-badge--${variant}`,
    `tds-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

export default Badge;

