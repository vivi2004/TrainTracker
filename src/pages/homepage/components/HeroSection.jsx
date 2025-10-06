import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = ({ onRouteSearch }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsGeolocationEnabled(true);
    }
  }, []);

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFromLocation('Current Location');
        },
        (error) => {
          console.log('Location detection failed');
        }
      );
    }
  };

  const handleRouteSearch = () => {
    if (fromLocation && toLocation) {
      onRouteSearch({ from: fromLocation, to: toLocation });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary to-secondary min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Live Map Visualization */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full relative">
          {/* Animated Train Routes */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path
                d="M50 150 Q200 50 350 150"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M50 200 L350 200"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-10"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </path>
              <path
                d="M50 100 Q200 250 350 100"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-10"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-inter font-bold text-white mb-6 leading-tight">
            Never wonder where your
            <span className="block text-safety-orange">train is again</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-inter font-medium max-w-3xl mx-auto leading-relaxed">
            Transform your daily commute with real-time tracking, predictive analytics, and community-driven insights
          </p>
        </div>

        {/* Route Search Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-2xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <Input
                label="From"
                type="text"
                placeholder="Enter departure station"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full"
              />
              {isGeolocationEnabled && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MapPin"
                  iconPosition="left"
                  onClick={handleLocationDetection}
                  className="mt-2 text-primary hover:text-primary/80"
                >
                  Use current location
                </Button>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <Input
                label="To"
                type="text"
                placeholder="Enter destination station"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="lg:col-span-1">
              <Button
                variant="default"
                size="lg"
                iconName="Search"
                iconPosition="left"
                onClick={handleRouteSearch}
                fullWidth
                className="h-12"
              >
                Track Route
              </Button>
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            variant="default"
            size="xl"
            iconName="Activity"
            iconPosition="left"
            className="bg-safety-orange hover:bg-safety-orange/90 text-white px-8 py-4 text-lg font-semibold"
          >
            Track My Route
          </Button>
          <Button
            variant="outline"
            size="xl"
            iconName="UserPlus"
            iconPosition="left"
            className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
          >
            Sign Up Free
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} />
            <span className="text-sm font-medium">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} />
            <span className="text-sm font-medium">Real-time Updates</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} />
            <span className="text-sm font-medium">Community Driven</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={20} />
            <span className="text-sm font-medium">Mobile Optimized</span>
          </div>
        </div>
      </div>

      {/* Floating Mobile Action Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-20">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full bg-safety-orange hover:bg-safety-orange/90 shadow-lg"
        >
          <Icon name="Navigation" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;