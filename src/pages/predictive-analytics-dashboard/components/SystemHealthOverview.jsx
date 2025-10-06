import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthOverview = () => {
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const systemMetrics = [
    {
      id: 'overall',
      name: 'Overall Health',
      value: 94,
      status: 'excellent',
      trend: 2.1,
      icon: 'Activity'
    },
    {
      id: 'reliability',
      name: 'Service Reliability',
      value: 91,
      status: 'good',
      trend: 1.8,
      icon: 'Shield'
    },
    {
      id: 'capacity',
      name: 'System Capacity',
      value: 87,
      status: 'good',
      trend: -0.5,
      icon: 'Users'
    },
    {
      id: 'maintenance',
      name: 'Maintenance Score',
      value: 96,
      status: 'excellent',
      trend: 3.2,
      icon: 'Settings'
    }
  ];

  const networkStatus = [
    {
      line: 'Blue Line',
      status: 'operational',
      reliability: 94,
      avgDelay: 1.8,
      activeTrains: 12,
      color: 'bg-blue-500'
    },
    {
      line: 'Red Line',
      status: 'operational',
      reliability: 89,
      avgDelay: 3.2,
      activeTrains: 10,
      color: 'bg-red-500'
    },
    {
      line: 'Green Line',
      status: 'operational',
      reliability: 96,
      avgDelay: 1.2,
      activeTrains: 8,
      color: 'bg-green-500'
    },
    {
      line: 'Orange Line',
      status: 'maintenance',
      reliability: 82,
      avgDelay: 5.1,
      activeTrains: 6,
      color: 'bg-orange-500'
    },
    {
      line: 'Purple Line',
      status: 'operational',
      reliability: 92,
      avgDelay: 2.3,
      activeTrains: 9,
      color: 'bg-purple-500'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'maintenance',
      severity: 'medium',
      title: 'Scheduled Maintenance',
      description: 'Orange Line: Platform upgrades at Central Station (12/15-12/17)',
      time: '2 hours ago',
      icon: 'Wrench'
    },
    {
      id: 2,
      type: 'weather',
      severity: 'low',
      title: 'Weather Advisory',
      description: 'Light rain expected tomorrow morning - minor delays possible',
      time: '4 hours ago',
      icon: 'CloudRain'
    },
    {
      id: 3,
      type: 'capacity',
      severity: 'high',
      title: 'High Demand Alert',
      description: 'Blue Line experiencing 120% normal capacity during evening rush',
      time: '6 hours ago',
      icon: 'AlertTriangle'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-status-green';
      case 'good': return 'text-primary';
      case 'warning': return 'text-delay-amber';
      case 'critical': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'excellent': return 'bg-status-green/10';
      case 'good': return 'bg-primary/10';
      case 'warning': return 'bg-delay-amber/10';
      case 'critical': return 'bg-disruption-red/10';
      default: return 'bg-muted/10';
    }
  };

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

  const getLineStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-status-green';
      case 'maintenance': return 'text-delay-amber';
      case 'disrupted': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-disruption-red';
      case 'medium': return 'text-delay-amber';
      case 'low': return 'text-status-green';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-disruption-red/10';
      case 'medium': return 'bg-delay-amber/10';
      case 'low': return 'bg-status-green/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 info-layer">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-inter font-semibold text-foreground">
          System Health Overview
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-status-green rounded-full status-breathing"></div>
          <span className="text-sm font-medium text-status-green">Live Monitoring</span>
        </div>
      </div>
      {/* System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {systemMetrics?.map((metric) => (
          <div
            key={metric?.id}
            onClick={() => setSelectedMetric(metric?.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedMetric === metric?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getStatusBg(metric?.status)}`}>
                <Icon 
                  name={metric?.icon} 
                  size={18} 
                  className={getStatusColor(metric?.status)} 
                  strokeWidth={2} 
                />
              </div>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={getTrendIcon(metric?.trend)} 
                  size={14} 
                  className={getTrendColor(metric?.trend)} 
                  strokeWidth={2} 
                />
                <span className={`text-xs font-medium ${getTrendColor(metric?.trend)}`}>
                  {metric?.trend > 0 ? '+' : ''}{metric?.trend}%
                </span>
              </div>
            </div>
            
            <div className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}%
            </div>
            <div className="text-xs text-muted-foreground">
              {metric?.name}
            </div>
            
            <div className="w-full bg-muted rounded-full h-1.5 mt-3">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  metric?.status === 'excellent' ? 'bg-status-green' :
                  metric?.status === 'good' ? 'bg-primary' :
                  metric?.status === 'warning' ? 'bg-delay-amber' : 'bg-disruption-red'
                }`}
                style={{ width: `${metric?.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {/* Network Status */}
      <div className="mb-6">
        <h4 className="text-md font-inter font-semibold text-foreground mb-4">
          Network Status
        </h4>
        <div className="space-y-3">
          {networkStatus?.map((line, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${line?.color}`}></div>
                <div>
                  <div className="text-sm font-medium text-foreground">{line?.line}</div>
                  <div className={`text-xs font-medium capitalize ${getLineStatusColor(line?.status)}`}>
                    {line?.status}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-right">
                <div>
                  <div className="text-sm font-semibold text-foreground">{line?.reliability}%</div>
                  <div className="text-xs text-muted-foreground">Reliability</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{line?.avgDelay}min</div>
                  <div className="text-xs text-muted-foreground">Avg Delay</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{line?.activeTrains}</div>
                  <div className="text-xs text-muted-foreground">Active Trains</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Alerts */}
      <div>
        <h4 className="text-md font-inter font-semibold text-foreground mb-4">
          System Alerts
        </h4>
        <div className="space-y-3">
          {alerts?.map((alert) => (
            <div 
              key={alert?.id} 
              className={`p-4 rounded-lg border border-border ${getSeverityBg(alert?.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getSeverityBg(alert?.severity)}`}>
                  <Icon 
                    name={alert?.icon} 
                    size={18} 
                    className={getSeverityColor(alert?.severity)} 
                    strokeWidth={2} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-semibold text-foreground">
                      {alert?.title}
                    </h5>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityBg(alert?.severity)} ${getSeverityColor(alert?.severity)}`}>
                        {alert?.severity}
                      </span>
                      <span className="text-xs text-muted-foreground">{alert?.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {alert?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Statistics */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">99.2%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-status-green">45</div>
            <div className="text-xs text-muted-foreground">Active Trains</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-delay-amber">2.4min</div>
            <div className="text-xs text-muted-foreground">Network Avg Delay</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-safety-orange">12,847</div>
            <div className="text-xs text-muted-foreground">Daily Passengers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthOverview;