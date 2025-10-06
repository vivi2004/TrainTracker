import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceStatusBoard = ({ serviceLines }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
        return 'text-status-green bg-green-50 border-green-200';
      case 'delayed':
        return 'text-delay-amber bg-amber-50 border-amber-200';
      case 'disrupted':
        return 'text-disruption-red bg-red-50 border-red-200';
      case 'maintenance':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
        return 'CheckCircle';
      case 'delayed':
        return 'Clock';
      case 'disrupted':
        return 'AlertTriangle';
      case 'maintenance':
        return 'Settings';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'on-time':
        return 'On Time';
      case 'delayed':
        return 'Delayed';
      case 'disrupted':
        return 'Disrupted';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card rounded-lg border transit-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Monitor" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-inter font-semibold text-foreground">
              Live Service Status
            </h2>
            <p className="text-sm text-muted-foreground">
              Real-time status from transit authority systems
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {serviceLines?.map((line, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transit-transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: line?.color }}
                  />
                  <div>
                    <h3 className="font-inter font-semibold text-foreground">
                      {line?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {line?.route}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${getStatusColor(line?.status)}`}>
                  <Icon name={getStatusIcon(line?.status)} size={14} />
                  <span className="text-sm font-medium">
                    {getStatusText(line?.status)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Next Train:</span>
                  <span className="font-medium text-foreground">{line?.nextTrain}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Crowding:</span>
                  <span className="font-medium text-foreground">{line?.crowding}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Frequency:</span>
                  <span className="font-medium text-foreground">{line?.frequency}</span>
                </div>
              </div>

              {line?.alerts && line?.alerts?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="space-y-2">
                    {line?.alerts?.map((alert, alertIndex) => (
                      <div key={alertIndex} className="flex items-start space-x-2">
                        <Icon name="Info" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{alert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={12} />
                    <span>Official Data</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-status-green rounded-full status-breathing" />
                    <span>Updated {line?.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceStatusBoard;