import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WhatIfScenarios = () => {
  const [selectedRoute, setSelectedRoute] = useState('blue-line');
  const [departureTime, setDepartureTime] = useState('08:00');
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [dayType, setDayType] = useState('weekday');

  const routes = [
    { id: 'blue-line', name: 'Blue Line', color: 'bg-blue-500' },
    { id: 'red-line', name: 'Red Line', color: 'bg-red-500' },
    { id: 'green-line', name: 'Green Line', color: 'bg-green-500' },
    { id: 'orange-line', name: 'Orange Line', color: 'bg-orange-500' }
  ];

  const weatherConditions = [
    { id: 'clear', name: 'Clear', icon: 'Sun' },
    { id: 'rain', name: 'Rain', icon: 'CloudRain' },
    { id: 'snow', name: 'Snow', icon: 'Snowflake' },
    { id: 'fog', name: 'Fog', icon: 'Cloud' }
  ];

  const dayTypes = [
    { id: 'weekday', name: 'Weekday' },
    { id: 'weekend', name: 'Weekend' },
    { id: 'holiday', name: 'Holiday' }
  ];

  const scenarios = [
    {
      id: 1,
      time: '08:00',
      probability: 92,
      avgDelay: 2.1,
      crowdLevel: 'High',
      recommendation: 'Optimal departure time'
    },
    {
      id: 2,
      time: '08:15',
      probability: 89,
      avgDelay: 3.2,
      crowdLevel: 'Very High',
      recommendation: 'Consider earlier departure'
    },
    {
      id: 3,
      time: '08:30',
      probability: 85,
      avgDelay: 4.8,
      crowdLevel: 'Very High',
      recommendation: 'High delay risk'
    },
    {
      id: 4,
      time: '07:45',
      probability: 95,
      avgDelay: 1.5,
      crowdLevel: 'Medium',
      recommendation: 'Best option available'
    }
  ];

  const getProbabilityColor = (probability) => {
    if (probability >= 90) return 'text-status-green';
    if (probability >= 80) return 'text-delay-amber';
    return 'text-disruption-red';
  };

  const getCrowdColor = (level) => {
    switch (level) {
      case 'Low': return 'text-status-green';
      case 'Medium': return 'text-delay-amber';
      case 'High': return 'text-safety-orange';
      case 'Very High': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationIcon = (recommendation) => {
    if (recommendation?.includes('Best')) return 'CheckCircle';
    if (recommendation?.includes('Optimal')) return 'ThumbsUp';
    if (recommendation?.includes('Consider')) return 'AlertTriangle';
    return 'AlertCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 info-layer">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-inter font-semibold text-foreground">
          What-If Scenarios
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" strokeWidth={2} />
          <span className="text-sm font-medium text-muted-foreground">AI Powered</span>
        </div>
      </div>
      {/* Scenario Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Route Selection */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Route
          </label>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {routes?.map((route) => (
              <option key={route?.id} value={route?.id}>
                {route?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Departure Time */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Departure Time
          </label>
          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Weather Condition */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Weather
          </label>
          <select
            value={weatherCondition}
            onChange={(e) => setWeatherCondition(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {weatherConditions?.map((weather) => (
              <option key={weather?.id} value={weather?.id}>
                {weather?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Day Type */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Day Type
          </label>
          <select
            value={dayType}
            onChange={(e) => setDayType(e?.target?.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dayTypes?.map((day) => (
              <option key={day?.id} value={day?.id}>
                {day?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Generate Scenarios Button */}
      <div className="mb-6">
        <Button 
          variant="default" 
          iconName="Play" 
          iconPosition="left"
          className="w-full sm:w-auto"
        >
          Generate Scenarios
        </Button>
      </div>
      {/* Scenario Results */}
      <div className="space-y-4">
        <h4 className="text-md font-inter font-semibold text-foreground mb-3">
          Predicted Outcomes
        </h4>
        
        {scenarios?.map((scenario) => (
          <div 
            key={scenario?.id} 
            className="bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted/70 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name="Clock" size={18} className="text-primary" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">{scenario?.time}</div>
                  <div className="text-sm text-muted-foreground">Departure Time</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getRecommendationIcon(scenario?.recommendation)} 
                  size={16} 
                  className={getProbabilityColor(scenario?.probability)} 
                  strokeWidth={2} 
                />
                <span className={`text-sm font-medium ${getProbabilityColor(scenario?.probability)}`}>
                  {scenario?.probability}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <div className="text-xs text-muted-foreground">On-Time Probability</div>
                <div className={`text-sm font-semibold ${getProbabilityColor(scenario?.probability)}`}>
                  {scenario?.probability}%
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground">Avg Delay</div>
                <div className="text-sm font-semibold text-foreground">
                  {scenario?.avgDelay} min
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground">Crowd Level</div>
                <div className={`text-sm font-semibold ${getCrowdColor(scenario?.crowdLevel)}`}>
                  {scenario?.crowdLevel}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground">Recommendation</div>
                <div className="text-sm font-semibold text-foreground">
                  {scenario?.recommendation}
                </div>
              </div>
            </div>

            {/* Probability Bar */}
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  scenario?.probability >= 90 ? 'bg-status-green' :
                  scenario?.probability >= 80 ? 'bg-delay-amber' : 'bg-disruption-red'
                }`}
                style={{ width: `${scenario?.probability}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {/* Factors Explanation */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Info" size={16} className="text-muted-foreground" strokeWidth={2} />
          <span className="text-sm font-medium text-muted-foreground">
            Prediction factors include:
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Historical performance data, weather conditions, day of week, time of day, 
          special events, maintenance schedules, and real-time system status.
        </div>
      </div>
    </div>
  );
};

export default WhatIfScenarios;