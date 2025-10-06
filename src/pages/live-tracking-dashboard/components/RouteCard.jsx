import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteCard = ({ route, isSelected, onClick, onToggleFavorite }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time': return 'text-status-green';
      case 'delayed': return 'text-delay-amber';
      case 'disrupted': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time': return 'CheckCircle';
      case 'delayed': return 'Clock';
      case 'disrupted': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'on-time': return 'bg-status-green/10';
      case 'delayed': return 'bg-delay-amber/10';
      case 'disrupted': return 'bg-disruption-red/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-250 hover:shadow-md ${
        isSelected 
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-inter font-semibold text-foreground text-sm">
              {route?.name}
            </h3>
            {route?.isFavorite && (
              <Icon name="Heart" size={14} color="var(--color-accent)" strokeWidth={2} />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {route?.from} → {route?.to}
          </p>
        </div>
        
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onToggleFavorite(route?.id);
          }}
          className="p-1 hover:bg-muted rounded-md transition-colors"
        >
          <Icon 
            name={route?.isFavorite ? "Heart" : "Heart"} 
            size={16} 
            color={route?.isFavorite ? "var(--color-accent)" : "var(--color-muted-foreground)"} 
            strokeWidth={route?.isFavorite ? 2.5 : 2}
          />
        </button>
      </div>
      <div className="space-y-2">
        {/* Status */}
        <div className={`flex items-center justify-between p-2 rounded-md ${getStatusBg(route?.status)}`}>
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(route?.status)} 
              size={14} 
              color={`var(--color-${route?.status === 'on-time' ? 'status-green' : route?.status === 'delayed' ? 'delay-amber' : 'disruption-red'})`}
              strokeWidth={2}
            />
            <span className={`text-xs font-medium capitalize ${getStatusColor(route?.status)}`}>
              {route?.status === 'on-time' ? 'On Time' : route?.status}
            </span>
          </div>
          {route?.delay > 0 && (
            <span className="text-xs font-medium text-delay-amber">+{route?.delay}min</span>
          )}
        </div>

        {/* Next Departure */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Next Departure:</span>
          <span className="text-xs font-medium text-foreground">{route?.nextDeparture}</span>
        </div>

        {/* Predicted Arrival */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Predicted Arrival:</span>
          <span className="text-xs font-medium text-foreground">{route?.predictedArrival}</span>
        </div>

        {/* Community Updates */}
        {route?.communityUpdates > 0 && (
          <div className="flex items-center space-x-2 pt-2 border-t border-border">
            <Icon name="MessageCircle" size={12} color="var(--color-primary)" strokeWidth={2} />
            <span className="text-xs text-primary font-medium">
              {route?.communityUpdates} community update{route?.communityUpdates > 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Capacity Indicator */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Capacity:</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  route?.capacity <= 50 ? 'bg-status-green' :
                  route?.capacity <= 80 ? 'bg-delay-amber' : 'bg-disruption-red'
                }`}
                style={{ width: `${route?.capacity}%` }}
              />
            </div>
            <span className="text-xs font-medium text-foreground">{route?.capacity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;