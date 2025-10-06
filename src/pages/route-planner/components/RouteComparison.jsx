import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteComparison = ({ routes, onClose, onSelectRoute }) => {
  const [selectedRoutes, setSelectedRoutes] = useState(routes?.slice(0, 2));

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getScoreColor = (score, type) => {
    if (type === 'reliability') {
      if (score >= 90) return 'text-status-green';
      if (score >= 75) return 'text-delay-amber';
      return 'text-disruption-red';
    }
    return 'text-foreground';
  };

  const comparisonMetrics = [
    { key: 'duration', label: 'Travel Time', format: formatDuration, icon: 'Clock' },
    { key: 'cost', label: 'Cost', format: (value) => value, icon: 'DollarSign' },
    { key: 'transfers', label: 'Transfers', format: (value) => value, icon: 'ArrowUpDown' },
    { key: 'walkingTime', label: 'Walking', format: (value) => `${value}m`, icon: 'MapPin' },
    { key: 'reliability', label: 'Reliability', format: (value) => `${value}%`, icon: 'Shield' },
    { key: 'delayRisk', label: 'Delay Risk', format: (value) => value, icon: 'AlertTriangle' }
  ];

  const getBestValue = (metric, routes) => {
    if (metric === 'reliability') {
      return Math.max(...routes?.map(r => r?.[metric]));
    }
    if (metric === 'duration' || metric === 'transfers' || metric === 'walkingTime') {
      return Math.min(...routes?.map(r => r?.[metric]));
    }
    return null;
  };

  const isBestValue = (value, metric, routes) => {
    const bestValue = getBestValue(metric, routes);
    return bestValue !== null && value === bestValue;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-inter font-bold text-foreground">Route Comparison</h2>
              <p className="text-sm text-muted-foreground">Compare routes side by side</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Route Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {selectedRoutes?.map((route, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">Route {index + 1}</h3>
                  {route?.isRecommended && (
                    <div className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                      Recommended
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {route?.departureTime} → {route?.arrivalTime}
                </div>
                <div className="text-lg font-bold text-foreground mt-1">
                  {formatDuration(route?.duration)}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="space-y-4">
            {comparisonMetrics?.map((metric) => (
              <div key={metric?.key} className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name={metric?.icon} size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">{metric?.label}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedRoutes?.map((route, index) => {
                    const value = route?.[metric?.key];
                    const isBest = isBestValue(value, metric?.key, selectedRoutes);
                    return (
                      <div key={index} className={`p-3 rounded-lg border-2 ${isBest ? 'border-status-green bg-status-green/5' : 'border-border'}`}>
                        <div className={`text-lg font-bold ${isBest ? 'text-status-green' : getScoreColor(value, metric?.key)}`}>
                          {metric?.format(value)}
                          {isBest && <Icon name="Crown" size={16} className="inline ml-2" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Route Segments Comparison */}
          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-4">Route Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedRoutes?.map((route, index) => (
                <div key={index} className="space-y-3">
                  <h5 className="text-sm font-medium text-muted-foreground">Route {index + 1} Segments</h5>
                  {route?.segments?.map((segment, segIndex) => (
                    <div key={segIndex} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${segment?.type === 'train' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{segment?.name}</div>
                        <div className="text-xs text-muted-foreground">{segment?.type}</div>
                      </div>
                      {segment?.duration && (
                        <div className="text-xs text-muted-foreground">{segment?.duration}m</div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close Comparison
            </Button>
            <div className="flex items-center space-x-3">
              {selectedRoutes?.map((route, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "secondary"}
                  onClick={() => onSelectRoute(route)}
                >
                  Select Route {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteComparison;