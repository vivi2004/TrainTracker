import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickFilters = ({ activeFilters, onFilterChange, onClearFilters }) => {
  const filterOptions = [
    {
      key: 'status',
      label: 'Status',
      icon: 'Activity',
      options: [
        { value: 'on-time', label: 'On Time', color: 'text-status-green' },
        { value: 'delayed', label: 'Delayed', color: 'text-delay-amber' },
        { value: 'disrupted', label: 'Disrupted', color: 'text-disruption-red' }
      ]
    },
    {
      key: 'route-type',
      label: 'Route Type',
      icon: 'Route',
      options: [
        { value: 'express', label: 'Express', color: 'text-primary' },
        { value: 'local', label: 'Local', color: 'text-secondary' },
        { value: 'limited', label: 'Limited', color: 'text-accent' }
      ]
    },
    {
      key: 'accessibility',
      label: 'Accessibility',
      icon: 'Accessibility',
      options: [
        { value: 'wheelchair', label: 'Wheelchair Access', color: 'text-status-green' },
        { value: 'elevator', label: 'Elevator Available', color: 'text-primary' },
        { value: 'audio', label: 'Audio Announcements', color: 'text-secondary' }
      ]
    }
  ];

  const handleFilterToggle = (filterKey, optionValue) => {
    const currentValues = activeFilters?.[filterKey] || [];
    const newValues = currentValues?.includes(optionValue)
      ? currentValues?.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    
    onFilterChange(filterKey, newValues);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((count, values) => count + values?.length, 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={18} color="var(--color-foreground)" strokeWidth={2} />
          <h3 className="font-inter font-semibold text-foreground">Quick Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        {getActiveFilterCount() > 0 && (
          <button
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-4">
        {filterOptions?.map((filter) => (
          <div key={filter?.key} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name={filter?.icon} size={14} color="var(--color-muted-foreground)" strokeWidth={2} />
              <span className="text-sm font-medium text-foreground">{filter?.label}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filter?.options?.map((option) => {
                const isActive = (activeFilters?.[filter?.key] || [])?.includes(option?.value);
                return (
                  <button
                    key={option?.value}
                    onClick={() => handleFilterToggle(filter?.key, option?.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {option?.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Saved Filter Presets */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Saved Presets</h4>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-medium hover:bg-muted/80 hover:text-foreground transition-colors">
            My Daily Commute
          </button>
          <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-medium hover:bg-muted/80 hover:text-foreground transition-colors">
            Accessible Routes
          </button>
          <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-medium hover:bg-muted/80 hover:text-foreground transition-colors">
            Express Only
          </button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors">
            <Icon name="Bookmark" size={14} strokeWidth={2} />
            <span>Save Current View</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-muted text-muted-foreground rounded-lg text-xs font-medium hover:bg-muted/80 hover:text-foreground transition-colors">
            <Icon name="Share2" size={14} strokeWidth={2} />
            <span>Share Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;