import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveStatusBar = ({ systemStatus, lastUpdate, onRefresh }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-status-green';
      case 'degraded': return 'text-delay-amber';
      case 'disrupted': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'degraded': return 'AlertCircle';
      case 'disrupted': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'operational': return 'bg-status-green/10';
      case 'degraded': return 'bg-delay-amber/10';
      case 'disrupted': return 'bg-disruption-red/10';
      default: return 'bg-muted/10';
    }
  };

  const mockSystemStats = {
    activeTrains: 247,
    onTimePerformance: 89,
    avgDelay: 3.2,
    totalRoutes: 12
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-status-green rounded-full status-breathing" />
          <h3 className="font-inter font-semibold text-foreground">System Status</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-xs text-muted-foreground">
            {formatTime(currentTime)}
          </span>
          <button
            onClick={onRefresh}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            title="Refresh data"
          >
            <Icon name="RefreshCw" size={14} color="var(--color-muted-foreground)" strokeWidth={2} />
          </button>
        </div>
      </div>
      {/* System Status */}
      <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${getStatusBg(systemStatus?.status)}`}>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(systemStatus?.status)} 
            size={16} 
            color={`var(--color-${systemStatus?.status === 'operational' ? 'status-green' : systemStatus?.status === 'degraded' ? 'delay-amber' : 'disruption-red'})`}
            strokeWidth={2}
          />
          <span className={`text-sm font-medium capitalize ${getStatusColor(systemStatus?.status)}`}>
            {systemStatus?.status}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Updated {Math.floor((Date.now() - lastUpdate) / 1000)}s ago
        </span>
      </div>
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Train" size={14} color="var(--color-primary)" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">Active Trains</span>
          </div>
          <span className="text-lg font-inter font-bold text-foreground">
            {mockSystemStats?.activeTrains}
          </span>
        </div>

        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Clock" size={14} color="var(--color-status-green)" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">On Time</span>
          </div>
          <span className="text-lg font-inter font-bold text-status-green">
            {mockSystemStats?.onTimePerformance}%
          </span>
        </div>

        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="TrendingUp" size={14} color="var(--color-delay-amber)" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">Avg Delay</span>
          </div>
          <span className="text-lg font-inter font-bold text-delay-amber">
            {mockSystemStats?.avgDelay}m
          </span>
        </div>

        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Route" size={14} color="var(--color-secondary)" strokeWidth={2} />
            <span className="text-xs text-muted-foreground">Routes</span>
          </div>
          <span className="text-lg font-inter font-bold text-foreground">
            {mockSystemStats?.totalRoutes}
          </span>
        </div>
      </div>
      {/* Service Alerts */}
      {systemStatus?.alerts && systemStatus?.alerts?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Service Alerts</h4>
          {systemStatus?.alerts?.map((alert, index) => (
            <div key={index} className="flex items-start space-x-2 p-2 bg-disruption-red/10 rounded-lg">
              <Icon name="AlertTriangle" size={14} color="var(--color-disruption-red)" strokeWidth={2} />
              <div className="flex-1">
                <p className="text-xs text-foreground font-medium">{alert?.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Data Sources */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Data Sources:</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-status-green rounded-full" />
              <span className="text-xs text-muted-foreground">Transit API</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-status-green rounded-full" />
              <span className="text-xs text-muted-foreground">Community</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-status-green rounded-full" />
              <span className="text-xs text-muted-foreground">GPS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatusBar;