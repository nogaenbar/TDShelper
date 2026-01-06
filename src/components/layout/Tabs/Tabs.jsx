import React from 'react';
import './Tabs.css';
import { TabBar } from '../../base/TabBar';
import { PreviewTab } from '../../workshop/PreviewTab';
import { CodeView } from '../../workshop/CodeView';
import { AccessibilityTab } from '../../workshop/AccessibilityTab';

/**
 * Tabs Component
 * Tab navigation for Preview, Component Source, and Accessibility
 * Pixel-perfect from Figma design
 */
export function Tabs({ activeTab, onTabChange, component, platform }) {
  const tabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'source', label: 'Component Source' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'preview':
        return <PreviewTab component={component} platform={platform} />;
      case 'source':
        return <CodeView component={component} />;
      case 'accessibility':
        return <AccessibilityTab component={component} />;
      default:
        return <PreviewTab component={component} platform={platform} />;
    }
  };

  return (
    <div className="tds-tabs">
      {/* Tab Bar */}
      <div className="tds-tabs__bar-container">
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      {/* Tab Content */}
      <div className="tds-tabs__content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Tabs;

