import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RouteSearchForm = ({ onSearch, isLoading }) => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    time: new Date()?.toTimeString()?.slice(0, 5),
    routePreference: 'fastest',
    accessibility: false
  });

  const [suggestions, setSuggestions] = useState({
    from: [],
    to: []
  });

  const [showSuggestions, setShowSuggestions] = useState({
    from: false,
    to: false
  });

  const stations = [
    "Central Station", "Union Square", "Downtown Terminal", "North Station",
    "South Bay", "East Junction", "West End", "Metro Center", "City Hall",
    "University Campus", "Airport Terminal", "Harbor View", "Industrial Park",
    "Suburban Plaza", "Tech District", "Financial Center", "Arts Quarter",
    "Sports Complex", "Medical Center", "Shopping Mall"
  ];

  const routePreferences = [
    { value: 'fastest', label: 'Fastest Route' },
    { value: 'fewest-transfers', label: 'Fewest Transfers' },
    { value: 'most-reliable', label: 'Most Reliable' }
  ];

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'from' || field === 'to') {
      if (value?.length > 0) {
        const filtered = stations?.filter(station => 
          station?.toLowerCase()?.includes(value?.toLowerCase())
        )?.slice(0, 5);
        setSuggestions(prev => ({ ...prev, [field]: filtered }));
        setShowSuggestions(prev => ({ ...prev, [field]: true }));
      } else {
        setShowSuggestions(prev => ({ ...prev, [field]: false }));
      }
    }
  };

  const handleSuggestionClick = (field, suggestion) => {
    setSearchData(prev => ({ ...prev, [field]: suggestion }));
    setShowSuggestions(prev => ({ ...prev, [field]: false }));
  };

  const handleSwapStations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev?.to,
      to: prev?.from
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (searchData?.from && searchData?.to) {
      onSearch(searchData);
    }
  };

  const setCurrentTime = () => {
    const now = new Date();
    setSearchData(prev => ({
      ...prev,
      date: now?.toISOString()?.split('T')?.[0],
      time: now?.toTimeString()?.slice(0, 5)
    }));
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 transit-elevation">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Route" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-inter font-bold text-foreground">Plan Your Journey</h2>
          <p className="text-sm text-muted-foreground">Find the best route with real-time optimization</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* From/To Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="relative">
            <Input
              label="From"
              type="text"
              placeholder="Enter departure station"
              value={searchData?.from}
              onChange={(e) => handleInputChange('from', e?.target?.value)}
              required
            />
            {showSuggestions?.from && suggestions?.from?.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-card border border-border rounded-lg shadow-lg mt-1">
                {suggestions?.from?.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick('from', suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              label="To"
              type="text"
              placeholder="Enter destination station"
              value={searchData?.to}
              onChange={(e) => handleInputChange('to', e?.target?.value)}
              required
            />
            {showSuggestions?.to && suggestions?.to?.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-card border border-border rounded-lg shadow-lg mt-1">
                {suggestions?.to?.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick('to', suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwapStations}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-card border-2 border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200 z-10 md:block hidden"
          >
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Date/Time Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Date"
            type="date"
            value={searchData?.date}
            onChange={(e) => handleInputChange('date', e?.target?.value)}
            required
          />
          <Input
            label="Time"
            type="time"
            value={searchData?.time}
            onChange={(e) => handleInputChange('time', e?.target?.value)}
            required
          />
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              onClick={setCurrentTime}
              iconName="Clock"
              iconPosition="left"
              className="w-full"
            >
              Now
            </Button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Route Preference"
            options={routePreferences}
            value={searchData?.routePreference}
            onChange={(value) => handleInputChange('routePreference', value)}
          />
          <div className="flex items-center space-x-3 pt-6">
            <input
              type="checkbox"
              id="accessibility"
              checked={searchData?.accessibility}
              onChange={(e) => handleInputChange('accessibility', e?.target?.checked)}
              className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="accessibility" className="text-sm font-medium text-foreground">
              Accessible routes only
            </label>
          </div>
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          iconName="Search"
          iconPosition="left"
          className="w-full"
          disabled={!searchData?.from || !searchData?.to}
        >
          Find Routes
        </Button>
      </form>
    </div>
  );
};

export default RouteSearchForm;