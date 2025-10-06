import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import PredictionAccuracyCard from './components/PredictionAccuracyCard';
import DelayHeatMap from './components/DelayHeatMap';
import PerformanceChart from './components/PerformanceChart';
import WhatIfScenarios from './components/WhatIfScenarios';
import PersonalAnalytics from './components/PersonalAnalytics';
import SystemHealthOverview from './components/SystemHealthOverview';
import MLInsightsPanel from './components/MLInsightsPanel';

const PredictiveAnalyticsDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const viewOptions = [
    { id: 'overview', name: 'Overview', icon: 'LayoutDashboard' },
    { id: 'predictions', name: 'Predictions', icon: 'Zap' },
    { id: 'personal', name: 'Personal', icon: 'User' },
    { id: 'system', name: 'System Health', icon: 'Activity' }
  ];

  const keyMetrics = [
    {
      title: 'Prediction Accuracy',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: 'Target',
      color: 'text-status-green'
    },
    {
      title: 'Network Reliability',
      value: '91.8%',
      change: '+1.3%',
      trend: 'up',
      icon: 'Shield',
      color: 'text-primary'
    },
    {
      title: 'Avg Delay Prediction',
      value: '2.4 min',
      change: '-0.8 min',
      trend: 'down',
      icon: 'Clock',
      color: 'text-delay-amber'
    },
    {
      title: 'Data Points Analyzed',
      value: '1.2M',
      change: '+15.2%',
      trend: 'up',
      icon: 'Database',
      color: 'text-safety-orange'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-status-green' : 'text-disruption-red';
  };

  const renderViewContent = () => {
    switch (selectedView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredictionAccuracyCard 
                accuracy={94.2} 
                confidence={87.5} 
                trend={2.1} 
              />
              <DelayHeatMap />
            </div>
            <PerformanceChart />
            <MLInsightsPanel />
          </div>
        );
      
      case 'predictions':
        return (
          <div className="space-y-6">
            <DelayHeatMap />
            <WhatIfScenarios />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PredictionAccuracyCard 
                accuracy={94.2} 
                confidence={87.5} 
                trend={2.1} 
              />
              <MLInsightsPanel />
            </div>
          </div>
        );
      
      case 'personal':
        return (
          <div className="space-y-6">
            <PersonalAnalytics />
            <WhatIfScenarios />
          </div>
        );
      
      case 'system':
        return (
          <div className="space-y-6">
            <SystemHealthOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceChart />
              <MLInsightsPanel />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-inter font-bold text-foreground">
                  Predictive Analytics Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  AI-powered insights and predictions for optimal transit planning
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-card rounded-lg border border-border">
                  <Icon name="Clock" size={16} className="text-muted-foreground" strokeWidth={2} />
                  <span className="text-sm font-medium text-foreground">
                    {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-status-green/10 rounded-lg">
                  <div className="w-2 h-2 bg-status-green rounded-full status-breathing"></div>
                  <span className="text-sm font-medium text-status-green">Live Data</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {keyMetrics?.map((metric, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-4 info-layer">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-muted/30`}>
                      <Icon 
                        name={metric?.icon} 
                        size={18} 
                        className={metric?.color} 
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
                        {metric?.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric?.title}
                  </div>
                </div>
              ))}
            </div>

            {/* View Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {viewOptions?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => setSelectedView(view?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedView === view?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={view?.icon} size={16} strokeWidth={2} />
                  <span>{view?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content */}
          {renderViewContent()}

          {/* Footer Information */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Brain" size={16} className="text-primary" strokeWidth={2} />
                  <span className="text-sm text-muted-foreground">
                    Powered by TrainTracker ML Engine v2.1
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Database" size={16} className="text-muted-foreground" strokeWidth={2} />
                  <span className="text-sm text-muted-foreground">
                    Processing 1.2M+ data points daily
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  API Documentation
                </button>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Model Performance
                </button>
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Data Sources
                </button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Last updated: {currentTime?.toLocaleString()} | 
                Next model refresh in 4 hours | 
                Prediction accuracy: 94.2% (30-day average)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PredictiveAnalyticsDashboard;