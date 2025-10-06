import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const OfficialDataSync = ({ syncStatus }) => {
  const [selectedAPI, setSelectedAPI] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-status-green bg-green-50 border-green-200';
      case 'syncing':
        return 'text-transit-blue bg-blue-50 border-blue-200';
      case 'error':
        return 'text-disruption-red bg-red-50 border-red-200';
      case 'maintenance':
        return 'text-delay-amber bg-amber-50 border-amber-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'syncing':
        return 'RefreshCw';
      case 'error':
        return 'AlertCircle';
      case 'maintenance':
        return 'Settings';
      default:
        return 'Circle';
    }
  };

  const formatDataSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg border transit-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Database" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-inter font-semibold text-foreground">
                Official Data Integration
              </h2>
              <p className="text-sm text-muted-foreground">
                Real-time synchronization with transit authority systems
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-green rounded-full status-breathing" />
            <span className="text-sm font-medium text-status-green">Live Sync</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Overall Sync Status */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-inter font-semibold text-foreground">System Status</h3>
            <div className="flex items-center space-x-2">
              <Icon name="Activity" size={16} className="text-status-green" />
              <span className="text-sm font-medium text-status-green">All Systems Operational</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{syncStatus?.totalAPIs}</div>
              <div className="text-muted-foreground">Connected APIs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-status-green">{syncStatus?.successfulSyncs}</div>
              <div className="text-muted-foreground">Successful Syncs</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-transit-blue">{formatDataSize(syncStatus?.dataTransferred)}</div>
              <div className="text-muted-foreground">Data Transferred</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{syncStatus?.lastSync}</div>
              <div className="text-muted-foreground">Last Update</div>
            </div>
          </div>
        </div>

        {/* API Connections */}
        <div className="space-y-4">
          <h3 className="font-inter font-semibold text-foreground mb-4">API Connections</h3>
          {syncStatus?.apis?.map((api, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transit-transition">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <Icon name={api?.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{api?.name}</h4>
                    <p className="text-sm text-muted-foreground">{api?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${getStatusColor(api?.status)}`}>
                    <Icon 
                      name={getStatusIcon(api?.status)} 
                      size={14} 
                      className={api?.status === 'syncing' ? 'animate-spin' : ''}
                    />
                    <span className="text-sm font-medium capitalize">{api?.status}</span>
                  </div>
                  <button
                    onClick={() => setSelectedAPI(selectedAPI === index ? null : index)}
                    className="p-2 rounded-lg hover:bg-muted transit-transition"
                  >
                    <Icon 
                      name={selectedAPI === index ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Frequency:</span>
                  <span className="font-medium text-foreground">{api?.syncFrequency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="font-medium text-foreground">{api?.latency}ms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="font-medium text-status-green">{api?.uptime}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Records:</span>
                  <span className="font-medium text-foreground">{api?.recordCount?.toLocaleString()}</span>
                </div>
              </div>

              {selectedAPI === index && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  {/* Data Types */}
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Data Types Synchronized:</h5>
                    <div className="flex flex-wrap gap-2">
                      {api?.dataTypes?.map((type, typeIndex) => (
                        <span 
                          key={typeIndex}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Recent Activity:</h5>
                    <div className="space-y-2">
                      {api?.recentActivity?.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                          <div className="flex items-center space-x-2">
                            <Icon name="Activity" size={14} className="text-primary" />
                            <span className="text-sm text-foreground">{activity?.action}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Error Log (if any) */}
                  {api?.errors && api?.errors?.length > 0 && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2 flex items-center">
                        <Icon name="AlertTriangle" size={16} className="mr-2 text-delay-amber" />
                        Recent Issues:
                      </h5>
                      <div className="space-y-2">
                        {api?.errors?.map((error, errorIndex) => (
                          <div key={errorIndex} className="p-3 rounded-lg bg-red-50 border border-red-200">
                            <div className="flex items-start space-x-2">
                              <Icon name="AlertCircle" size={14} className="text-disruption-red mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-disruption-red font-medium">{error?.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">{error?.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* API Configuration */}
                  <div className="pt-3 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                      <div>
                        <span className="font-medium">Endpoint:</span>
                        <span className="ml-2 font-mono">{api?.endpoint}</span>
                      </div>
                      <div>
                        <span className="font-medium">Version:</span>
                        <span className="ml-2">{api?.version}</span>
                      </div>
                      <div>
                        <span className="font-medium">Authentication:</span>
                        <span className="ml-2">{api?.authType}</span>
                      </div>
                      <div>
                        <span className="font-medium">Rate Limit:</span>
                        <span className="ml-2">{api?.rateLimit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Data Quality Metrics */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-inter font-semibold text-foreground mb-4">Data Quality Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-status-green/10 border border-status-green/20">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-status-green" />
                <div>
                  <div className="text-lg font-bold text-status-green">{syncStatus?.dataQuality?.accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Data Accuracy</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-transit-blue/10 border border-transit-blue/20">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-transit-blue" />
                <div>
                  <div className="text-lg font-bold text-transit-blue">{syncStatus?.dataQuality?.freshness}s</div>
                  <div className="text-sm text-muted-foreground">Avg. Data Freshness</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center space-x-3">
                <Icon name="Database" size={20} className="text-primary" />
                <div>
                  <div className="text-lg font-bold text-primary">{syncStatus?.dataQuality?.completeness}%</div>
                  <div className="text-sm text-muted-foreground">Data Completeness</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialDataSync;