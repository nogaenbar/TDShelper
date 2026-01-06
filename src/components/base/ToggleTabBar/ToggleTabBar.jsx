import React, { useRef, useEffect, useState } from 'react';
import './ToggleTabBar.css';
import './ToggleTab.css';
import { ToggleTab } from './ToggleTab';

/**
 * ToggleTabBar Component
 * Toggle between options (e.g., Web/App)
 * Pixel-perfect from Figma design 3968:532312
 * 
 * Uses exact tokens from Token Studio:
 * - Container: white background, 4px gap/padding, 384px border radius, subtle elevation
 * - Tab: 40px height, 12px/8px padding, 384px border radius
 * - Typography: 16px semibold, normal letter spacing
 * - Colors: selectedPrimary (default/hover/active) for selected, tertiary for unselected
 */
export function ToggleTabBar({ value, onChange, options = [] }) {
  // Find the index of the selected tab for slide animation
  const selectedIndex = options.findIndex(opt => opt.value === value);
  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({});
  
  useEffect(() => {
    if (containerRef.current && tabRefs.current[selectedIndex] && selectedIndex >= 0) {
      const container = containerRef.current;
      const selectedTab = tabRefs.current[selectedIndex];
      const containerRect = container.getBoundingClientRect();
      const tabRect = selectedTab.getBoundingClientRect();
      
      // Calculate slider position and width based on actual tab dimensions
      const leftOffset = tabRect.left - containerRect.left;
      const width = tabRect.width;
      
      setSliderStyle({
        '--selected-index': selectedIndex,
        '--total-tabs': options.length || 1,
        '--slider-left': `${leftOffset}px`,
        '--slider-width': `${width}px`
      });
    }
  }, [selectedIndex, options.length]);
  
  return (
    <div className="tds-toggle-tab-bar">
      <div ref={containerRef} className="tds-toggle-tab-bar__container">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          return (
            <ToggleTab
              key={option.value}
              ref={(el) => (tabRefs.current[index] = el)}
              value={option.value}
              label={option.label}
              isSelected={isSelected}
              onClick={() => onChange?.(option.value)}
            />
          );
        })}
        {/* Sliding background indicator - placed after tabs for proper z-index stacking */}
        <div 
          className="tds-toggle-tab-bar__slider"
          style={sliderStyle}
        />
      </div>
    </div>
  );
}

// Export ToggleTab as a static property for composition
ToggleTabBar.ToggleTab = ToggleTab;

export default ToggleTabBar;
