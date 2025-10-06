import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');

  const performanceData = [
    { date: '12/07', onTime: 92, delayed: 8, cancelled: 0, avgDelay: 2.1 },
    { date: '12/08', onTime: 89, delayed: 10, cancelled: 1, avgDelay: 3.2 },
    { date: '12/09', onTime: 94, delayed: 6, cancelled: 0, avgDelay: 1.8 },
    { date: '12/10', onTime: 87, delayed: 12, cancelled: 1, avgDelay: 4.1 },
    { date: '12/11', onTime: 91, delayed: 8, cancelled: 1, avgDelay: 2.7 },
    { date: '12/12', onTime: 95, delayed: 5, cancelled: 0, avgDelay: 1.5 },
    { date: '12/13', onTime: 93, delayed: 7, cancelled: 0, avgDelay: 2.0 }
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' }
  ];

  const chartTypes = [
    { id: 'line', label: 'Trend', icon: 'TrendingUp' },
    { id: 'bar', label: 'Compare', icon: 'BarChart3' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey === 'onTime' ? 'On Time' : 
                 entry?.dataKey === 'delayed' ? 'Delayed' : 
                 entry?.dataKey === 'cancelled' ? 'Cancelled' : 'Avg Delay'}: ${entry?.value}${entry?.dataKey === 'avgDelay' ? 'min' : '%'}`}
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
          Historical Performance
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {chartTypes?.map((type) => (
              <button
                key={type?.id}
                onClick={() => setChartType(type?.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  chartType === type?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={14} strokeWidth={2} />
                <span>{type?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Time Range Selector */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium text-muted-foreground">Time Range:</span>
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
      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="onTime" 
                stroke="var(--color-status-green)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-status-green)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-status-green)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="delayed" 
                stroke="var(--color-delay-amber)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-delay-amber)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-delay-amber)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="cancelled" 
                stroke="var(--color-disruption-red)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-disruption-red)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-disruption-red)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="onTime" fill="var(--color-status-green)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="delayed" fill="var(--color-delay-amber)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="cancelled" fill="var(--color-disruption-red)" radius={[2, 2, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Performance Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-status-green">91.6%</div>
          <div className="text-xs text-muted-foreground">Avg On-Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-delay-amber">8.0%</div>
          <div className="text-xs text-muted-foreground">Avg Delayed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-disruption-red">0.4%</div>
          <div className="text-xs text-muted-foreground">Avg Cancelled</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;