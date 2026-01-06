import React, { useState } from 'react';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { TdsTextButton } from './components/base/TdsTextButton';
import { ToggleTabBar } from './components/base/ToggleTabBar';

/**
 * TDS Helper - Component Workshop
 * Main application component
 */
function App() {
  // Mock component data - organized by component type
  // Base Components: Public building blocks with child components
  const baseComponents = [
    {
      id: 'tds-text-button',
      name: 'TdsTextButton',
      category: 'base',
      description: 'Primary interactive button component with multiple sizes, states, and icon support',
      platform: 'web',
      variants: [
        // Large size variants
        { name: 'Large - Default', props: { size: 'large', variant: 'primary', state: 'default' } },
        { name: 'Large - Hover', props: { size: 'large', variant: 'primary', state: 'hover' } },
        { name: 'Large - Active', props: { size: 'large', variant: 'primary', state: 'active' } },
        { name: 'Large - Disabled', props: { size: 'large', variant: 'primary', disabled: true } },
        { name: 'Large - Loading', props: { size: 'large', variant: 'primary', loading: true } },
        { name: 'Large - Icon Right', props: { size: 'large', variant: 'primary', icon: true, iconPosition: 'right' } },
        { name: 'Large - Icon Left', props: { size: 'large', variant: 'primary', icon: true, iconPosition: 'left' } },
        { name: 'Large - No Icon', props: { size: 'large', variant: 'primary', icon: false } },
        // Medium size variants
        { name: 'Medium - Default', props: { size: 'medium', variant: 'primary', state: 'default' } },
        { name: 'Medium - Hover', props: { size: 'medium', variant: 'primary', state: 'hover' } },
        { name: 'Medium - Active', props: { size: 'medium', variant: 'primary', state: 'active' } },
        { name: 'Medium - Disabled', props: { size: 'medium', variant: 'primary', disabled: true } },
        { name: 'Medium - Loading', props: { size: 'medium', variant: 'primary', loading: true } },
        { name: 'Medium - Icon Right', props: { size: 'medium', variant: 'primary', icon: true, iconPosition: 'right' } },
        { name: 'Medium - Icon Left', props: { size: 'medium', variant: 'primary', icon: true, iconPosition: 'left' } },
        { name: 'Medium - No Icon', props: { size: 'medium', variant: 'primary', icon: false } },
        // Small size variants
        { name: 'Small - Default', props: { size: 'small', variant: 'primary', state: 'default' } },
        { name: 'Small - Hover', props: { size: 'small', variant: 'primary', state: 'hover' } },
        { name: 'Small - Active', props: { size: 'small', variant: 'primary', state: 'active' } },
        { name: 'Small - Disabled', props: { size: 'small', variant: 'primary', disabled: true } },
        { name: 'Small - Loading', props: { size: 'small', variant: 'primary', loading: true } },
        { name: 'Small - Icon Right', props: { size: 'small', variant: 'primary', icon: true, iconPosition: 'right' } },
        { name: 'Small - Icon Left', props: { size: 'small', variant: 'primary', icon: true, iconPosition: 'left' } },
        { name: 'Small - No Icon', props: { size: 'small', variant: 'primary', icon: false } },
      ],
      properties: [
        {
          name: 'variant',
          type: "'primary' | 'secondary' | 'tertiary'",
          default: "'primary'",
          description: 'The visual style variant of the button',
        },
        {
          name: 'size',
          type: "'small' | 'medium' | 'large'",
          default: "'medium'",
          description: 'The size of the button. Controls minHeight, padding, gap, and borderRadius',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is disabled',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is in a loading state',
        },
        {
          name: 'icon',
          type: 'boolean',
          default: 'false',
          description: 'Whether to display an icon in the button',
        },
        {
          name: 'iconPosition',
          type: "'left' | 'right'",
          default: "'right'",
          description: 'Position of the icon relative to the button text',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          default: 'undefined',
          description: 'The button label text',
        },
        {
          name: 'onClick',
          type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
          default: 'undefined',
          description: 'Callback function called when the button is clicked',
        },
        {
          name: 'type',
          type: "'button' | 'submit' | 'reset'",
          default: "'button'",
          description: 'The HTML button type attribute',
        },
        {
          name: 'className',
          type: 'string',
          default: "''",
          description: 'Additional CSS classes to apply to the button',
        },
      ],
      renderPreview: (variant) => {
        const props = variant.props || {};
        
        // Extract button props (exclude state as it's handled by CSS hover/active)
        const buttonProps = {
          variant: props.variant || 'primary',
          size: props.size || 'medium',
          disabled: props.disabled || false,
          loading: props.loading || false,
          icon: props.icon || false,
          iconPosition: props.iconPosition || 'right',
          type: props.type || 'button',
          className: props.className || '',
          onClick: props.onClick || (() => {}),
        };
        
        // Determine button label
        let buttonLabel = 'Button';
        if (props.children && props.children !== 'undefined' && props.children !== '') {
          buttonLabel = props.children;
        } else if (buttonProps.icon) {
          buttonLabel = 'Label';
        }
        
        // For interactive example, don't wrap in preview wrapper
        // Let natural hover/active states work
        if (variant.name === 'Interactive Example') {
          return (
            <TdsTextButton {...buttonProps}>
              {buttonLabel}
            </TdsTextButton>
          );
        }
        
        // For variant previews, simulate states if needed
        const state = props.state || 'default';
        const stateClass = state !== 'default' ? `tds-text-button--preview-${state}` : '';
        const wrapperClassName = stateClass 
          ? `tds-text-button-preview-wrapper ${stateClass}` 
          : 'tds-text-button-preview-wrapper';
        
        return (
          <div className={wrapperClassName}>
            <TdsTextButton {...buttonProps}>
              {variant.name.includes('Icon') ? 'Label' : 'Button'}
            </TdsTextButton>
          </div>
        );
      },
      accessibility: {
        ariaLabel: 'Button component with proper ARIA attributes',
        keyboardNavigation: 'Fully keyboard accessible with Enter and Space',
        screenReaderSupport: 'Properly announced with role="button" and aria-busy for loading state',
        colorContrast: 'Meets WCAG AA standards',
        focusManagement: 'Visible focus indicators',
      },
    },
    {
      id: 'toggle-tab-bar',
      name: 'ToggleTabBar',
      category: 'base',
      description: 'Pill-style toggle component for binary options (e.g., Web/App)',
      platform: 'web',
      variants: [
        // Left column: Selected states (rows 1-3)
        { name: 'Default', props: { selected: true, state: 'default' }, column: 'left' },
        // Right column: Unselected states (rows 1-3)
        { name: 'Default', props: { selected: false, state: 'default' }, column: 'right' },
        // Left column: Selected Hover
        { name: 'Hover', props: { selected: true, state: 'hover' }, column: 'left' },
        // Right column: Unselected Hover
        { name: 'Hover', props: { selected: false, state: 'hover' }, column: 'right' },
        // Left column: Selected Active
        { name: 'Active', props: { selected: true, state: 'active' }, column: 'left' },
        // Right column: Unselected Active
        { name: 'Active', props: { selected: false, state: 'active' }, column: 'right' },
      ],
      properties: [
        {
          name: 'value',
          type: 'string',
          default: 'undefined',
          description: 'The currently selected option value',
        },
        {
          name: 'onChange',
          type: '(value: string) => void',
          default: 'undefined',
          description: 'Callback function called when selection changes',
        },
        {
          name: 'options',
          type: 'Array<{ value: string; label: string }>',
          default: '[]',
          description: 'Array of options to display in the toggle bar',
        },
      ],
      renderPreview: (variant, interactiveProps = {}) => {
        // For interactive example, use interactiveProps if available
        const value = interactiveProps.value !== undefined 
          ? interactiveProps.value 
          : (variant.props?.selected ? 'web' : 'app');
        
        const options = [
          { value: 'web', label: 'Web' },
          { value: 'app', label: 'App' },
        ];
        
        // For interactive example, use the onChange from interactiveProps
        const onChange = interactiveProps.onChange || (() => {});
        
        // If this is an interactive example (no state prop), render fully interactive
        if (!variant.props?.state || variant.name === 'Interactive Example') {
          return (
            <ToggleTabBar
              value={value}
              onChange={onChange}
              options={options}
            />
          );
        }
        
        // For variant previews with states, render static preview
        const isSelected = variant.props?.selected ?? true;
        const state = variant.props?.state || 'default';
        
        if (state === 'default') {
          return (
            <ToggleTabBar
              value={isSelected ? 'web' : 'app'}
              onChange={() => {}}
              options={options}
            />
          );
        }
        
        // For hover/active states, render a single button with the state class
        return (
          <div className="tds-toggle-tab-bar-preview">
            <div className="tds-toggle-tab-bar">
              <div className="tds-toggle-tab-bar__container">
                <button
                  className={`tds-toggle-tab-bar__tab ${
                    isSelected ? 'tds-toggle-tab-bar__tab--selected' : ''
                  } ${
                    state === 'hover' ? 'tds-toggle-tab-bar__tab--preview-hover' : ''
                  } ${
                    state === 'active' ? 'tds-toggle-tab-bar__tab--preview-active' : ''
                  }`}
                >
                  {isSelected ? 'Web' : 'App'}
                </button>
              </div>
            </div>
          </div>
        );
      },
      accessibility: {
        ariaLabel: 'ToggleTabBar component with proper ARIA attributes',
        keyboardNavigation: 'Fully keyboard accessible with Enter and Space',
        screenReaderSupport: 'Properly announced with aria-selected attribute',
        colorContrast: 'Meets WCAG AA standards',
        focusManagement: 'Visible focus indicators',
      },
    },
  ];

  // Pattern Components: Higher-level, opinionated assemblies
  const patternComponents = [];

  // Subcomponents: Internal parts for implementation
  const subcomponents = [];

  // Combine all components for backward compatibility
  const components = [...baseComponents, ...patternComponents, ...subcomponents];

  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [platform, setPlatform] = useState('web');
  const [activeTab, setActiveTab] = useState('preview');

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    setActiveTab('preview');
  };

  const handleNewComponent = () => {
    // Placeholder for new component creation
    console.log('New component clicked');
  };

  return (
    <div className="tds-app">
      <Sidebar
        components={components}
        selectedComponent={selectedComponent}
        onSelectComponent={handleSelectComponent}
        onNewComponent={handleNewComponent}
      />
      <MainContent
        component={selectedComponent}
        platform={platform}
        onPlatformChange={setPlatform}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default App;
