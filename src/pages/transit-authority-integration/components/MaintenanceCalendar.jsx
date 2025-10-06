import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MaintenanceCalendar = ({ maintenanceEvents }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('week'); // week, month

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today?.getDay();
    const startOfWeek = new Date(today);
    startOfWeek?.setDate(today?.getDate() - currentDay);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      weekDates?.push(date);
    }
    return weekDates;
  };

  const getEventsForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return maintenanceEvents?.filter(event => 
      event?.startDate <= dateStr && event?.endDate >= dateStr
    );
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-disruption-red text-white';
      case 'medium':
        return 'bg-delay-amber text-white';
      case 'low':
        return 'bg-status-green text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="bg-card rounded-lg border transit-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-inter font-semibold text-foreground">
                Maintenance Schedule
              </h2>
              <p className="text-sm text-muted-foreground">
                Official planned maintenance and service work
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transit-transition ${
                viewMode === 'week' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transit-transition ${
                viewMode === 'month' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {viewMode === 'week' && (
          <div className="grid grid-cols-7 gap-2">
            {weekDates?.map((date, index) => {
              const events = getEventsForDate(date);
              const isToday = date?.toDateString() === new Date()?.toDateString();
              
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border cursor-pointer transit-transition ${
                    isToday 
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-center">
                    <div className={`text-xs font-medium mb-1 ${
                      isToday ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {date?.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-semibold ${
                      isToday ? 'text-primary' : 'text-foreground'
                    }`}>
                      {date?.getDate()}
                    </div>
                    {events?.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {events?.slice(0, 2)?.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`w-full h-1.5 rounded-full ${getImpactColor(event?.impact)}`}
                          />
                        ))}
                        {events?.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{events?.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedDate && (
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-inter font-semibold text-foreground mb-4">
              Events for {formatDate(selectedDate)}
            </h3>
            <div className="space-y-3">
              {getEventsForDate(selectedDate)?.map((event, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{event?.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(event?.impact)}`}>
                      {event?.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{event?.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {event?.duration}
                      </span>
                      <span className="flex items-center">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        {event?.location}
                      </span>
                    </div>
                    {event?.alternativeRoute && (
                      <span className="flex items-center text-primary">
                        <Icon name="ArrowRight" size={12} className="mr-1" />
                        Alternative available
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceCalendar;