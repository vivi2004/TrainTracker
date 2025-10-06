import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatsCounter = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    trainsTracked: 0,
    successfulJourneys: 0,
    citiesCovered: 0
  });

  const finalStats = {
    activeUsers: 12847,
    trainsTracked: 2156,
    successfulJourneys: 8934,
    citiesCovered: 45
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        activeUsers: Math.floor(finalStats?.activeUsers * progress),
        trainsTracked: Math.floor(finalStats?.trainsTracked * progress),
        successfulJourneys: Math.floor(finalStats?.successfulJourneys * progress),
        citiesCovered: Math.floor(finalStats?.citiesCovered * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const statsData = [
    {
      icon: 'Users',
      value: stats?.activeUsers?.toLocaleString(),
      label: 'Active Users Today',
      color: 'text-status-green',
      bgColor: 'bg-status-green/10'
    },
    {
      icon: 'Train',
      value: stats?.trainsTracked?.toLocaleString(),
      label: 'Trains Tracked Live',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'CheckCircle',
      value: stats?.successfulJourneys?.toLocaleString(),
      label: 'Successful Journeys',
      color: 'text-safety-orange',
      bgColor: 'bg-safety-orange/10'
    },
    {
      icon: 'MapPin',
      value: stats?.citiesCovered?.toLocaleString(),
      label: 'Cities Covered',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-inter font-bold text-foreground mb-4">
            Trusted by Thousands of Commuters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of smart commuters who never miss their train
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData?.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center info-layer transit-transition hover:scale-105"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat?.bgColor} mb-4`}>
                <Icon name={stat?.icon} size={28} className={stat?.color} strokeWidth={2.5} />
              </div>
              <div className="space-y-2">
                <div className={`text-3xl md:text-4xl font-inter font-bold ${stat?.color}`}>
                  {stat?.value}
                </div>
                <div className="text-sm font-inter font-medium text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Indicator */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <div className="w-3 h-3 bg-status-green rounded-full status-breathing"></div>
          <span className="text-sm font-inter font-medium text-muted-foreground">
            Updated in real-time • Last update: {new Date()?.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;