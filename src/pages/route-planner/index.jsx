import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import RouteSearchForm from './components/RouteSearchForm';
import RouteCard from './components/RouteCard';
import SmartSuggestions from './components/SmartSuggestions';
import RouteComparison from './components/RouteComparison';
import WeatherIntegration from './components/WeatherIntegration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const RoutePlanner = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [showWeather, setShowWeather] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);

  // Mock data for routes
  const mockRoutes = [
    {
      id: 1,
      departureTime: "8:15 AM",
      arrivalTime: "9:42 AM",
      duration: 87,
      cost: "$4.50",
      transfers: 1,
      walkingTime: 8,
      reliability: 92,
      delayRisk: "Low",
      isRecommended: true,
      weatherImpact: "Light rain may cause 2-3 min delays",
      segments: [
        { name: "Central Station", type: "train", duration: 25 },
        { name: "Metro Center", type: "transfer", duration: 5 },
        { name: "Downtown Terminal", type: "train", duration: 35 },
        { name: "University Campus", type: "walking", duration: 8 }
      ]
    },
    {
      id: 2,
      departureTime: "8:20 AM",
      arrivalTime: "9:55 AM",
      duration: 95,
      cost: "$3.75",
      transfers: 2,
      walkingTime: 12,
      reliability: 85,
      delayRisk: "Medium",
      isRecommended: false,
      segments: [
        { name: "Central Station", type: "train", duration: 20 },
        { name: "North Station", type: "transfer", duration: 7 },
        { name: "East Junction", type: "train", duration: 30 },
        { name: "Tech District", type: "transfer", duration: 4 },
        { name: "University Campus", type: "train", duration: 22 },
        { name: "Final Stop", type: "walking", duration: 12 }
      ]
    },
    {
      id: 3,
      departureTime: "8:10 AM",
      arrivalTime: "9:38 AM",
      duration: 88,
      cost: "$5.25",
      transfers: 0,
      walkingTime: 15,
      reliability: 96,
      delayRisk: "Low",
      isRecommended: false,
      segments: [
        { name: "Central Station", type: "train", duration: 73 },
        { name: "University Campus", type: "walking", duration: 15 }
      ]
    }
  ];

  // Mock smart suggestions
  const mockSuggestions = [
    {
      type: "time",
      title: "Leave 10 minutes earlier",
      description: "Departing at 8:05 AM reduces delay risk by 15% and gives you more route options.",
      impact: "Save 5-8 minutes",
      details: [
        { label: "Delay Risk", value: "Low" },
        { label: "Options", value: "+3 routes" }
      ]
    },
    {
      type: "weather",
      title: "Weather-optimized route",
      description: "Light rain expected. Underground routes have 20% better on-time performance today.",
      impact: "92% reliability",
      details: [
        { label: "Rain Impact", value: "Minimal" },
        { label: "Underground", value: "85% route" }
      ]
    },
    {
      type: "crowd",
      title: "Avoid rush hour peak",
      description: "Trains are 40% less crowded if you leave 15 minutes later.",
      impact: "More comfortable journey",
      details: [
        { label: "Crowd Level", value: "Low" },
        { label: "Seats Available", value: "High" }
      ]
    }
  ];

  // Mock weather data
  const mockWeatherData = {
    condition: "rainy",
    temperature: 52,
    impact: "medium",
    visibility: "Good",
    windSpeed: 12,
    humidity: 78,
    alerts: [
      {
        severity: "medium",
        title: "Light Rain Advisory",
        description: "Expect 2-5 minute delays on outdoor platforms"
      }
    ],
    recommendations: "Consider underground routes for better reliability. Bring an umbrella for platform transfers."
  };

  const handleSearch = async (searchData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockRoutes);
      setIsLoading(false);
    }, 1500);
  };

  const handleSaveRoute = (route) => {
    if (!savedRoutes?.find(r => r?.id === route?.id)) {
      setSavedRoutes([...savedRoutes, route]);
      // Show success notification (could be implemented with a toast library)
      console.log('Route saved successfully');
    }
  };

  const handleShareRoute = (route) => {
    // Implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'TrainTracker Route',
        text: `Route from ${route?.segments?.[0]?.name} to ${route?.segments?.[route?.segments?.length - 1]?.name}`,
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      console.log('Route link copied to clipboard');
    }
  };

  const handleSelectRoute = (route) => {
    // Navigate to live tracking or save as active route
    console.log('Selected route:', route);
  };

  const handleCompareRoutes = () => {
    if (searchResults?.length >= 2) {
      setSelectedRoutes(searchResults?.slice(0, 2));
      setShowComparison(true);
    }
  };

  const handleApplySuggestion = (suggestion) => {
    // Apply the suggestion to search parameters
    console.log('Applying suggestion:', suggestion);
    // Re-run search with optimized parameters
    handleSearch({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Route" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-inter font-bold text-foreground">Route Planner</h1>
                <p className="text-muted-foreground">Find the perfect journey with AI-powered optimization</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-primary">2.3M+</div>
                <div className="text-sm text-muted-foreground">Routes Planned</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-status-green">94%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-accent">15min</div>
                <div className="text-sm text-muted-foreground">Avg. Time Saved</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4 text-center">
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground">Live Updates</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Search Form and Weather */}
            <div className="lg:col-span-1 space-y-6">
              <RouteSearchForm onSearch={handleSearch} isLoading={isLoading} />
              
              <WeatherIntegration 
                weatherData={mockWeatherData}
                showWeather={showWeather}
                onWeatherToggle={() => setShowWeather(!showWeather)}
              />

              {searchResults?.length > 0 && (
                <SmartSuggestions 
                  suggestions={mockSuggestions}
                  onApplySuggestion={handleApplySuggestion}
                />
              )}
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2">
              {isLoading ? (
                <div className="bg-card rounded-xl border border-border p-8 text-center">
                  <div className="data-stream w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="Route" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Finding optimal routes...</h3>
                  <p className="text-muted-foreground">Analyzing real-time data and traffic patterns</p>
                </div>
              ) : searchResults?.length > 0 ? (
                <div className="space-y-6">
                  {/* Results Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-inter font-bold text-foreground">
                        {searchResults?.length} Routes Found
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Sorted by reliability and travel time
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="BarChart3"
                        iconPosition="left"
                        onClick={handleCompareRoutes}
                        disabled={searchResults?.length < 2}
                      >
                        Compare
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Filter"
                      >
                        Filter
                      </Button>
                    </div>
                  </div>

                  {/* Route Cards */}
                  <div className="space-y-4">
                    {searchResults?.map((route) => (
                      <RouteCard
                        key={route?.id}
                        route={route}
                        onSave={handleSaveRoute}
                        onShare={handleShareRoute}
                        onSelect={handleSelectRoute}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="text-center pt-4">
                    <Button variant="outline" iconName="Plus" iconPosition="left">
                      Load More Routes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-xl border border-border p-8 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Ready to plan your journey?</h3>
                  <p className="text-muted-foreground mb-4">
                    Enter your departure and destination to find the best routes
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>Real-time updates</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Zap" size={16} />
                      <span>AI optimization</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Shield" size={16} />
                      <span>Reliability scores</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Users" size={16} />
                      <span>Community insights</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Saved Routes Section */}
          {savedRoutes?.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center space-x-3 mb-6">
                <Icon name="Heart" size={20} className="text-accent" />
                <h2 className="text-xl font-inter font-bold text-foreground">Saved Routes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedRoutes?.map((route) => (
                  <div key={route?.id} className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {route?.segments?.[0]?.name} → {route?.segments?.[route?.segments?.length - 1]?.name}
                      </span>
                      <Button variant="ghost" size="sm" iconName="X" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {route?.departureTime} • {route?.duration}m • {route?.cost}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Route Comparison Modal */}
      {showComparison && (
        <RouteComparison
          routes={selectedRoutes}
          onClose={() => setShowComparison(false)}
          onSelectRoute={handleSelectRoute}
        />
      )}
    </div>
  );
};

export default RoutePlanner;