import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceAnnouncementCard = ({ announcement }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return 'AlertTriangle';
      case 'high':
        return 'AlertCircle';
      case 'medium':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-disruption-red bg-red-50 border-red-200';
      case 'high':
        return 'text-delay-amber bg-amber-50 border-amber-200';
      case 'medium':
        return 'text-transit-blue bg-blue-50 border-blue-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getPriorityColor(announcement?.priority)} transit-transition`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon 
            name={getPriorityIcon(announcement?.priority)} 
            size={20} 
            className={announcement?.priority === 'critical' ? 'text-disruption-red' : 
                      announcement?.priority === 'high'? 'text-delay-amber' : 'text-transit-blue'} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-inter font-semibold text-foreground text-sm">
              {announcement?.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Icon name="Shield" size={12} className="mr-1" />
                Official
              </span>
              <span className="text-xs text-muted-foreground">
                {announcement?.timestamp}
              </span>
            </div>
          </div>
          <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
            {announcement?.message}
          </p>
          {announcement?.affectedLines && (
            <div className="flex flex-wrap gap-2 mb-3">
              {announcement?.affectedLines?.map((line, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface text-surface-foreground"
                >
                  <Icon name="Train" size={12} className="mr-1" />
                  {line}
                </span>
              ))}
            </div>
          )}
          {announcement?.actionRequired && (
            <div className="flex items-center space-x-2 text-xs">
              <Icon name="ArrowRight" size={14} className="text-primary" />
              <span className="font-medium text-primary">{announcement?.actionRequired}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceAnnouncementCard;