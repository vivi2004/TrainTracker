import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DelayHeatMap = () => {
  const [selectedTime, setSelectedTime] = useState('morning');
  const [selectedDay, setSelectedDay] = useState('weekday');

  const timeSlots = [
    { id: 'morning', label: 'Morning Rush', time: '7-9 AM' },
    { id: 'midday', label: 'Midday', time: '11 AM-2 PM' },
    { id: 'evening', label: 'Evening Rush', time: '5-7 PM' },
    { id: 'night', label: 'Night', time: '8-11 PM' }
  ];

  const dayTypes = [
    { id: 'weekday', label: 'Weekdays' },
    { id: 'weekend', label: 'Weekends' }
  ];

  const routes = [
    { name: 'Blue Line', reliability: 92, avgDelay: 2.3, color: 'bg-blue-500' },
    { name: 'Red Line', reliability: 87, avgDelay: 4.1, color: 'bg-red-500' },
    { name: 'Green Line', reliability: 94, avgDelay: 1.8, color: 'bg-green-500' },
    { name: 'Orange Line', reliability: 89, avgDelay: 3.2, color: 'bg-orange-500' },
    { name: 'Purple Line', reliability: 91, avgDelay: 2.7, color: 'bg-purple-500' },
    { name: 'Yellow Line', reliability: 85, avgDelay: 4.8, color: 'bg-yellow-500' }
  ];

  const getReliabilityColor = (reliability) => {
    if (reliability >= 90) return 'bg-status-green';
    if (reliability >= 80) return 'bg-delay-amber';
    return 'bg-disruption-red';
  };

  const getReliabilityIntensity = (reliability) => {
    if (reliability >= 95) return 'opacity-100';
    if (reliability >= 90) return 'opacity-80';
    if (reliability >= 85) return 'opacity-60';
    if (reliability >= 80) return 'opacity-40';
    return 'opacity-20';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 info-layer">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-inter font-semibold text-foreground">
          Route Reliability Heat Map
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" strokeWidth={2} />
          <span className="text-sm font-medium text-muted-foreground">Live Data</span>
        </div>
      </div>
      {/* Time and Day Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Time Period
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots?.map((slot) => (
              <button
                key={slot?.id}
                onClick={() => setSelectedTime(slot?.id)}
                className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedTime === slot?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <div>{slot?.label}</div>
                <div className="opacity-75">{slot?.time}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Day Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dayTypes?.map((day) => (
              <button
                key={day?.id}
                onClick={() => setSelectedDay(day?.id)}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedDay === day?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {day?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Heat Map Grid */}
      <div className="space-y-3 mb-6">
        {routes?.map((route, index) => (
          <div key={route?.name} className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 w-32">
              <div className={`w-3 h-3 rounded-full ${route?.color}`}></div>
              <span className="text-sm font-medium text-foreground">{route?.name}</span>
            </div>
            
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getReliabilityColor(route?.reliability)} ${getReliabilityIntensity(route?.reliability)}`}
                  style={{ width: `${route?.reliability}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground">
                    {route?.reliability}%
                  </span>
                </div>
              </div>
              
              <div className="text-right w-16">
                <div className="text-xs font-medium text-foreground">
                  {route?.avgDelay}min
                </div>
                <div className="text-xs text-muted-foreground">avg delay</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <span className="text-xs font-medium text-muted-foreground">Reliability:</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-status-green rounded"></div>
            <span className="text-xs text-muted-foreground">90%+</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-delay-amber rounded"></div>
            <span className="text-xs text-muted-foreground">80-89%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-disruption-red rounded"></div>
            <span className="text-xs text-muted-foreground">&lt;80%</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="RefreshCw" size={14} className="text-muted-foreground" strokeWidth={2} />
          <span className="text-xs text-muted-foreground">Updated 2 min ago</span>
        </div>
      </div>
    </div>
  );
};

export default DelayHeatMap;