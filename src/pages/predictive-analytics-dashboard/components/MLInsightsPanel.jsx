import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MLInsightsPanel = () => {
  const [selectedInsight, setSelectedInsight] = useState('patterns');

  const insightTypes = [
    { id: 'patterns', name: 'Patterns', icon: 'TrendingUp' },
    { id: 'predictions', name: 'Predictions', icon: 'Zap' },
    { id: 'recommendations', name: 'Recommendations', icon: 'Lightbulb' }
  ];

  const patterns = [
    {
      id: 1,
      title: 'Rush Hour Congestion Pattern',
      description: 'Blue Line experiences 40% higher delays between 8:15-8:45 AM on weekdays.',
      confidence: 94,
      impact: 'High',
      factors: ['Time of day', 'Day of week', 'Weather conditions'],
      icon: 'Clock'
    },
    {
      id: 2,
      title: 'Weather Correlation',
      description: 'Rain increases average delays by 2.3 minutes across all lines, with Red Line most affected.',
      confidence: 87,
      impact: 'Medium',
      factors: ['Precipitation', 'Temperature', 'Wind speed'],
      icon: 'CloudRain'
    },
    {
      id: 3,
      title: 'Weekend Usage Shift',
      description: 'Green Line sees 60% increase in weekend ridership, optimal for leisure travel.',
      confidence: 91,
      impact: 'Medium',
      factors: ['Day type', 'Destination patterns', 'Event schedules'],
      icon: 'Calendar'
    }
  ];

  const predictions = [
    {
      id: 1,
      title: 'Next Hour Forecast',
      description: 'Blue Line: 92% on-time probability, Red Line: 85% probability with 3-minute delays expected.',
      timeframe: '1 hour',
      accuracy: 96,
      icon: 'Clock'
    },
    {
      id: 2,
      title: 'Tomorrow Morning Rush',
      description: 'Clear weather predicted. All lines expected to operate at 90%+ reliability.',
      timeframe: '18 hours',
      accuracy: 89,
      icon: 'Sun'
    },
    {
      id: 3,
      title: 'Weekend Outlook',
      description: 'Light maintenance on Orange Line Saturday. Green Line recommended for downtown trips.',
      timeframe: '2 days',
      accuracy: 82,
      icon: 'Calendar'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Optimal Departure Time',
      description: 'Leave 12 minutes earlier during weekday mornings to avoid peak congestion.',
      benefit: 'Save 8-12 minutes',
      priority: 'High',
      icon: 'Clock'
    },
    {
      id: 2,
      title: 'Alternative Route Suggestion',
      description: 'Use Green Line instead of Blue Line on Friday evenings for 15% faster travel.',
      benefit: 'Reduce travel time',
      priority: 'Medium',
      icon: 'Route'
    },
    {
      id: 3,
      title: 'Weather Preparation',
      description: 'Check weather alerts before departure. Rain days require 5-10 extra minutes.',
      benefit: 'Avoid delays',
      priority: 'Medium',
      icon: 'Umbrella'
    }
  ];

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-status-green';
    if (confidence >= 80) return 'text-delay-amber';
    return 'text-disruption-red';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-disruption-red';
      case 'Medium': return 'text-delay-amber';
      case 'Low': return 'text-status-green';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-disruption-red';
      case 'Medium': return 'text-delay-amber';
      case 'Low': return 'text-status-green';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'High': return 'bg-disruption-red/10';
      case 'Medium': return 'bg-delay-amber/10';
      case 'Low': return 'bg-status-green/10';
      default: return 'bg-muted/10';
    }
  };

  const renderContent = () => {
    switch (selectedInsight) {
      case 'patterns':
        return (
          <div className="space-y-4">
            {patterns?.map((pattern) => (
              <div key={pattern?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon name={pattern?.icon} size={18} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-semibold text-foreground">
                        {pattern?.title}
                      </h5>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs font-medium ${getImpactColor(pattern?.impact)}`}>
                          {pattern?.impact} Impact
                        </span>
                        <span className={`text-xs font-medium ${getConfidenceColor(pattern?.confidence)}`}>
                          {pattern?.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {pattern?.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Icon name="Brain" size={14} className="text-muted-foreground" strokeWidth={2} />
                      <span className="text-xs text-muted-foreground">
                        Key factors: {pattern?.factors?.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'predictions':
        return (
          <div className="space-y-4">
            {predictions?.map((prediction) => (
              <div key={prediction?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-status-green/10 rounded-lg">
                    <Icon name={prediction?.icon} size={18} className="text-status-green" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-semibold text-foreground">
                        {prediction?.title}
                      </h5>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-muted-foreground">
                          {prediction?.timeframe}
                        </span>
                        <span className={`text-xs font-medium ${getConfidenceColor(prediction?.accuracy)}`}>
                          {prediction?.accuracy}% accurate
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {prediction?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-4">
            {recommendations?.map((recommendation) => (
              <div key={recommendation?.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-start space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getPriorityBg(recommendation?.priority)}`}>
                    <Icon 
                      name={recommendation?.icon} 
                      size={18} 
                      className={getPriorityColor(recommendation?.priority)} 
                      strokeWidth={2} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-semibold text-foreground">
                        {recommendation?.title}
                      </h5>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityBg(recommendation?.priority)} ${getPriorityColor(recommendation?.priority)}`}>
                        {recommendation?.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {recommendation?.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={14} className="text-status-green" strokeWidth={2} />
                      <span className="text-xs font-medium text-status-green">
                        {recommendation?.benefit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 info-layer">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-inter font-semibold text-foreground">
          Machine Learning Insights
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" strokeWidth={2} />
          <span className="text-sm font-medium text-muted-foreground">AI Powered</span>
        </div>
      </div>
      {/* Insight Type Selector */}
      <div className="flex items-center space-x-1 mb-6 bg-muted rounded-lg p-1">
        {insightTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => setSelectedInsight(type?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              selectedInsight === type?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={type?.icon} size={16} strokeWidth={2} />
            <span>{type?.name}</span>
          </button>
        ))}
      </div>
      {/* Content Area */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
      {/* Model Information */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Cpu" size={16} className="text-muted-foreground" strokeWidth={2} />
            <span className="text-sm text-muted-foreground">
              Model: TrainTracker ML v2.1 | Last updated: 2 hours ago
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-status-green rounded-full"></div>
              <span className="text-xs text-muted-foreground">Model Active</span>
            </div>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLInsightsPanel;