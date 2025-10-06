import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteCard = ({ route, onSave, onShare, onSelect }) => {
  const getReliabilityColor = (score) => {
    if (score >= 90) return 'text-status-green';
    if (score >= 75) return 'text-delay-amber';
    return 'text-disruption-red';
  };

  const getReliabilityBg = (score) => {
    if (score >= 90) return 'bg-status-green/10';
    if (score >= 75) return 'bg-delay-amber/10';
    return 'bg-disruption-red/10';
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
         onClick={() => onSelect(route)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getReliabilityBg(route?.reliability)} ${getReliabilityColor(route?.reliability)}`}>
            {route?.reliability}% reliable
          </div>
          {route?.isRecommended && (
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              Recommended
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{formatDuration(route?.duration)}</div>
          <div className="text-sm text-muted-foreground">{route?.cost}</div>
        </div>
      </div>
      {/* Route Timeline */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{route?.departureTime}</span>
          <span>{route?.arrivalTime}</span>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-2">
            {route?.segments?.map((segment, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${segment?.type === 'train' ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                  <div className="text-xs text-muted-foreground mt-1 text-center min-w-0">
                    {segment?.name}
                  </div>
                </div>
                {index < route?.segments?.length - 1 && (
                  <div className={`flex-1 h-0.5 ${segment?.type === 'train' ? 'bg-primary' : 'bg-muted-foreground'} mx-2`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* Route Details */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-sm font-medium text-foreground">{route?.transfers}</div>
          <div className="text-xs text-muted-foreground">Transfers</div>
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{route?.walkingTime}m</div>
          <div className="text-xs text-muted-foreground">Walking</div>
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{route?.delayRisk}</div>
          <div className="text-xs text-muted-foreground">Delay Risk</div>
        </div>
      </div>
      {/* Weather Impact */}
      {route?.weatherImpact && (
        <div className="flex items-center space-x-2 mb-4 p-3 bg-muted/50 rounded-lg">
          <Icon name="Cloud" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{route?.weatherImpact}</span>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Heart"
            onClick={(e) => {
              e?.stopPropagation();
              onSave(route);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            onClick={(e) => {
              e?.stopPropagation();
              onShare(route);
            }}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={(e) => {
            e?.stopPropagation();
            onSelect(route);
          }}
        >
          Select Route
        </Button>
      </div>
    </div>
  );
};

export default RouteCard;