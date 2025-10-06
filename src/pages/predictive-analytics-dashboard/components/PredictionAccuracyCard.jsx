import React from 'react';
import Icon from '../../../components/AppIcon';

const PredictionAccuracyCard = ({ accuracy, confidence, trend }) => {
  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-status-green';
    if (trend < 0) return 'text-disruption-red';
    return 'text-muted-foreground';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 info-layer">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-inter font-semibold text-foreground">
          Prediction Accuracy
        </h3>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getTrendIcon(trend)} 
            size={16} 
            className={getTrendColor(trend)} 
            strokeWidth={2}
          />
          <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
            {trend > 0 ? '+' : ''}{trend?.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Overall Accuracy</span>
            <span className="text-2xl font-bold text-primary">{accuracy}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Confidence Level</span>
            <span className="text-lg font-semibold text-foreground">{confidence}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-status-green rounded-full h-2 transition-all duration-500"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={14} className="text-muted-foreground" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">
              Based on last 30 days of predictions vs actual arrivals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionAccuracyCard;