import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const PersonalAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' }
  ];

  const travelPatterns = [
    { route: 'Blue Line', trips: 45, percentage: 60, color: '#3B82F6' },
    { route: 'Red Line', trips: 18, percentage: 24, color: '#EF4444' },
    { route: 'Green Line', trips: 12, percentage: 16, color: '#10B981' }
  ];

  const timeSavings = [
    { week: 'Week 1', saved: 23, optimal: 18 },
    { week: 'Week 2', saved: 31, optimal: 25 },
    { week: 'Week 3', saved: 28, optimal: 22 },
    { week: 'Week 4', saved: 35, optimal: 28 }
  ];

  const insights = [
    {
      id: 1,
      type: 'optimization',
      title: 'Peak Hour Avoidance',
      description: 'You save an average of 12 minutes by departing 15 minutes earlier during rush hour.',
      impact: 'High',
      icon: 'Clock'
    },
    {
      id: 2,
      type: 'pattern',
      title: 'Route Preference',
      description: 'Blue Line is your most reliable route with 94% on-time performance for your trips.',
      impact: 'Medium',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      type: 'recommendation',
      title: 'Alternative Route',
      description: 'Consider Green Line on Fridays - 8 minutes faster with 15% less crowding.',
      impact: 'Medium',
      icon: 'Route'
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-status-green';
      case 'Medium': return 'text-delay-amber';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact) {
      case 'High': return 'bg-status-green/10';
      case 'Medium': return 'bg-delay-amber/10';
      case 'Low': return 'bg-muted/10';
      default: return 'bg-muted/10';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey === 'saved' ? 'Time Saved' : 'Optimal Route'}: ${entry?.value} min`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 info-layer">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-inter font-semibold text-foreground">
          Personal Analytics
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.id}
                onClick={() => setTimeRange(range?.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                  timeRange === range?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-primary">75</div>
          <div className="text-xs text-muted-foreground">Total Trips</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-status-green">94%</div>
          <div className="text-xs text-muted-foreground">On-Time Rate</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-delay-amber">117</div>
          <div className="text-xs text-muted-foreground">Minutes Saved</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-safety-orange">2.3</div>
          <div className="text-xs text-muted-foreground">Avg Delay (min)</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Travel Patterns Pie Chart */}
        <div>
          <h4 className="text-md font-inter font-semibold text-foreground mb-4">
            Route Usage Distribution
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={travelPatterns}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="trips"
                >
                  {travelPatterns?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} trips`, name]}
                  labelFormatter={(label) => `Route: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {travelPatterns?.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: pattern?.color }}
                  ></div>
                  <span className="text-sm text-foreground">{pattern?.route}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {pattern?.trips} trips ({pattern?.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Savings Chart */}
        <div>
          <h4 className="text-md font-inter font-semibold text-foreground mb-4">
            Weekly Time Savings
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSavings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="saved" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="optimal" fill="var(--color-status-green)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span className="text-xs text-muted-foreground">Actual Saved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-status-green rounded"></div>
              <span className="text-xs text-muted-foreground">Optimal Route</span>
            </div>
          </div>
        </div>
      </div>
      {/* Personalized Insights */}
      <div>
        <h4 className="text-md font-inter font-semibold text-foreground mb-4">
          Personalized Insights
        </h4>
        <div className="space-y-3">
          {insights?.map((insight) => (
            <div 
              key={insight?.id} 
              className={`p-4 rounded-lg border border-border ${getImpactBg(insight?.impact)} hover:bg-opacity-80 transition-all duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getImpactBg(insight?.impact)}`}>
                  <Icon 
                    name={insight?.icon} 
                    size={18} 
                    className={getImpactColor(insight?.impact)} 
                    strokeWidth={2} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-semibold text-foreground">
                      {insight?.title}
                    </h5>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactBg(insight?.impact)} ${getImpactColor(insight?.impact)}`}>
                      {insight?.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Options */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-muted-foreground" strokeWidth={2} />
            <span className="text-sm text-muted-foreground">Export your data</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              CSV
            </button>
            <span className="text-xs text-muted-foreground">|</span>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">
              PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAnalytics;