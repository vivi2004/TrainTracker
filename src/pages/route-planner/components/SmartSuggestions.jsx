import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SmartSuggestions = ({ suggestions, onApplySuggestion }) => {
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'time': return 'Clock';
      case 'weather': return 'Cloud';
      case 'crowd': return 'Users';
      case 'delay': return 'AlertTriangle';
      default: return 'Lightbulb';
    }
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'time': return 'text-primary';
      case 'weather': return 'text-delay-amber';
      case 'crowd': return 'text-secondary';
      case 'delay': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getSuggestionBg = (type) => {
    switch (type) {
      case 'time': return 'bg-primary/10';
      case 'weather': return 'bg-delay-amber/10';
      case 'crowd': return 'bg-secondary/10';
      case 'delay': return 'bg-disruption-red/10';
      default: return 'bg-muted/50';
    }
  };

  if (!suggestions || suggestions?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 transit-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-inter font-bold text-foreground">Smart Suggestions</h3>
          <p className="text-sm text-muted-foreground">AI-powered recommendations for your journey</p>
        </div>
      </div>
      <div className="space-y-4">
        {suggestions?.map((suggestion, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getSuggestionBg(suggestion?.type)}`}>
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSuggestionBg(suggestion?.type)}`}>
                <Icon name={getSuggestionIcon(suggestion?.type)} size={16} className={getSuggestionColor(suggestion?.type)} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{suggestion?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{suggestion?.description}</p>
                    {suggestion?.impact && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon name="TrendingUp" size={14} className="text-status-green" />
                        <span className="text-xs text-status-green font-medium">{suggestion?.impact}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApplySuggestion(suggestion)}
                    className="ml-4"
                  >
                    Apply
                  </Button>
                </div>
                {suggestion?.details && (
                  <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/50">
                    {suggestion?.details?.map((detail, detailIndex) => (
                      <div key={detailIndex} className="text-center">
                        <div className="text-sm font-medium text-foreground">{detail?.value}</div>
                        <div className="text-xs text-muted-foreground">{detail?.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">How it works</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Our AI analyzes historical data, current conditions, and your preferences to suggest optimal departure times and routes.
        </p>
      </div>
    </div>
  );
};

export default SmartSuggestions;