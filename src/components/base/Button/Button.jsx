import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * Token-driven button component following system-first principles.
 * All styling uses tokens from variables.css - no magic numbers.
 * 
 * @param {Object} props
 * @param {string} props.variant - Button variant: 'primary' | 'secondary' | 'tertiary'
 * @param {string} props.size - Button size: 'small' | 'medium' | 'large'
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.icon - Whether to show icon
 * @param {string} props.iconPosition - Icon position: 'left' | 'right'
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type: 'button' | 'submit' | 'reset'
 * @param {string} props.className - Additional CSS classes
 */
export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = false,
  iconPosition = 'right',
  children,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseClass = 'tds-button';
  const variantClass = `${baseClass}--${variant}`;
  const sizeClass = `${baseClass}--${size}`;
  const stateClass = disabled 
    ? `${baseClass}--disabled` 
    : loading 
    ? `${baseClass}--loading` 
    : '';
  
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    stateClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  // Placeholder icon component (will be replaced with icon library later)
  const IconPlaceholder = () => (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${baseClass}__icon ${baseClass}__icon--${iconPosition}`}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="5" y1="5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled}
      {...props}
    >
      {loading && <span className={`${baseClass}__spinner`} aria-hidden="true" />}
      <span className={`${baseClass}__content`}>
        {icon && iconPosition === 'left' && <IconPlaceholder />}
        {children}
        {icon && iconPosition === 'right' && <IconPlaceholder />}
      </span>
    </button>
  );
}

export default Button;

