import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherIntegration = ({ weatherData, onWeatherToggle, showWeather }) => {
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': return 'Sun';
      case 'cloudy': return 'Cloud';
      case 'rainy': return 'CloudRain';
      case 'snowy': return 'CloudSnow';
      case 'stormy': return 'CloudLightning';
      default: return 'Cloud';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'low': return 'text-status-green';
      case 'medium': return 'text-delay-amber';
      case 'high': return 'text-disruption-red';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'low': return 'bg-status-green/10';
      case 'medium': return 'bg-delay-amber/10';
      case 'high': return 'bg-disruption-red/10';
      default: return 'bg-muted/50';
    }
  };

  if (!showWeather || !weatherData) {
    return (
      <div className="bg-card rounded-xl border border-border p-4">
        <button
          onClick={onWeatherToggle}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name="Cloud" size={16} />
          <span className="text-sm">Show weather impact</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 transit-elevation">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name={getWeatherIcon(weatherData?.condition)} size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-inter font-bold text-foreground">Weather Impact</h3>
            <p className="text-sm text-muted-foreground">Current conditions affecting your journey</p>
          </div>
        </div>
        <button
          onClick={onWeatherToggle}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={getWeatherIcon(weatherData?.condition)} size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Current Weather</span>
          </div>
          <div className="text-lg font-bold text-foreground">{weatherData?.temperature}°F</div>
          <div className="text-sm text-muted-foreground capitalize">{weatherData?.condition}</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Travel Impact</span>
          </div>
          <div className={`text-lg font-bold ${getImpactColor(weatherData?.impact)}`}>
            {weatherData?.impact}
          </div>
          <div className="text-sm text-muted-foreground">Delay risk</div>
        </div>
      </div>
      {weatherData?.alerts && weatherData?.alerts?.length > 0 && (
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium text-foreground">Weather Alerts</h4>
          {weatherData?.alerts?.map((alert, index) => (
            <div key={index} className={`p-3 rounded-lg ${getImpactBg(alert?.severity)}`}>
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className={`mt-0.5 ${getImpactColor(alert?.severity)}`} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{alert?.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{alert?.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">{weatherData?.visibility}</div>
          <div className="text-xs text-muted-foreground">Visibility</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">{weatherData?.windSpeed} mph</div>
          <div className="text-xs text-muted-foreground">Wind Speed</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">{weatherData?.humidity}%</div>
          <div className="text-xs text-muted-foreground">Humidity</div>
        </div>
      </div>
      {weatherData?.recommendations && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">Weather Recommendations</div>
              <div className="text-xs text-muted-foreground">{weatherData?.recommendations}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherIntegration;