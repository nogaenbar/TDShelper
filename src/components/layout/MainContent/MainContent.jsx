import React from 'react';
import './MainContent.css';
import { Tabs } from '../Tabs';
import { ToggleTabBar } from '../../base/ToggleTabBar';

/**
 * MainContent Component
 * Main content area for component workshop
 * Pixel-perfect from Figma design
 */
export function MainContent({
  component,
  platform = 'web',
  onPlatformChange,
  activeTab = 'preview',
  onTabChange,
}) {
  if (!component) {
    return (
      <main className="tds-main-content">
        <div className="tds-main-content__empty">
          <p>Select a component to view details</p>
        </div>
      </main>
    );
  }

  return (
    <main className="tds-main-content" data-node-id="8164:14110">
      {/* Header Section */}
      <div className="tds-main-content__header" data-node-id="8164:14111">
        <div className="tds-main-content__header-top" data-node-id="8164:14112">
          <div className="tds-main-content__title-area" data-node-id="8164:14113">
            <h2 className="tds-main-content__title" data-node-id="8164:14115">{component.name}</h2>
            <p className="tds-main-content__subtitle" data-node-id="8164:14117">
              {component.description || 'Building a new component with variants and properties'}
            </p>
          </div>
          <ToggleTabBar
            value={platform}
            onChange={onPlatformChange}
            options={[
              { value: 'web', label: 'Web' },
              { value: 'app', label: 'App' },
            ]}
          />
        </div>
      </div>

      {/* Preview Area */}
      <div className="tds-main-content__preview-area" data-node-id="8164:14119">
        <Tabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          component={component}
          platform={platform}
        />
      </div>
    </main>
  );
}

export default MainContent;

