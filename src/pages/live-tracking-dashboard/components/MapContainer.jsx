import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ selectedRoute, onTrainSelect, mapLayers, onLayerToggle }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });

  // Mock train data with real-time positions
  const mockTrains = [
    {
      id: 'train_001',
      line: 'Blue Line',
      position: { lat: 40.7589, lng: -73.9851 },
      status: 'on-time',
      nextStop: 'Grand Central',
      delay: 0,
      capacity: 75,
      direction: 'Downtown',
      speed: 35
    },
    {
      id: 'train_002',
      line: 'Red Line',
      position: { lat: 40.7505, lng: -73.9934 },
      status: 'delayed',
      nextStop: 'Times Square',
      delay: 8,
      capacity: 90,
      direction: 'Uptown',
      speed: 0
    },
    {
      id: 'train_003',
      line: 'Green Line',
      position: { lat: 40.7282, lng: -73.9942 },
      status: 'on-time',
      nextStop: 'Union Square',
      delay: 0,
      capacity: 45,
      direction: 'Brooklyn',
      speed: 28
    },
    {
      id: 'train_004',
      line: 'Orange Line',
      position: { lat: 40.7614, lng: -73.9776 },
      status: 'disrupted',
      nextStop: 'Service Suspended',
      delay: 0,
      capacity: 0,
      direction: 'N/A',
      speed: 0
    }
  ];

  const handleTrainClick = (train) => {
    setSelectedTrain(train);
    onTrainSelect(train);
  };

  const getTrainStatusColor = (status) => {
    switch (status) {
      case 'on-time': return 'bg-status-green';
      case 'delayed': return 'bg-delay-amber';
      case 'disrupted': return 'bg-disruption-red';
      default: return 'bg-muted';
    }
  };

  const getTrainIcon = (status) => {
    switch (status) {
      case 'on-time': return 'Train';
      case 'delayed': return 'Clock';
      case 'disrupted': return 'AlertTriangle';
      default: return 'Train';
    }
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Live Train Tracking Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
          className="w-full h-full"
        />
      </div>
      {/* Map Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Train Markers */}
        {mockTrains?.map((train) => (
          <div
            key={train?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
            style={{
              left: `${((train?.position?.lng + 74.0060) / 0.1) * 100}%`,
              top: `${((40.7800 - train?.position?.lat) / 0.1) * 100}%`
            }}
            onClick={() => handleTrainClick(train)}
          >
            <div className={`w-8 h-8 rounded-full ${getTrainStatusColor(train?.status)} flex items-center justify-center shadow-lg border-2 border-white`}>
              <Icon 
                name={getTrainIcon(train?.status)} 
                size={16} 
                color="white" 
                strokeWidth={2.5} 
              />
            </div>
            {train?.speed > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            )}
          </div>
        ))}

        {/* Station Markers (if accessibility layer is enabled) */}
        {mapLayers?.accessibility && (
          <>
            <div className="absolute pointer-events-auto" style={{ left: '45%', top: '30%' }}>
              <div className="w-6 h-6 bg-card rounded-full flex items-center justify-center shadow-md border border-border">
                <Icon name="Accessibility" size={12} color="var(--color-primary)" strokeWidth={2} />
              </div>
            </div>
            <div className="absolute pointer-events-auto" style={{ left: '55%', top: '60%' }}>
              <div className="w-6 h-6 bg-card rounded-full flex items-center justify-center shadow-md border border-border">
                <Icon name="Accessibility" size={12} color="var(--color-primary)" strokeWidth={2} />
              </div>
            </div>
          </>
        )}

        {/* Weather Overlay */}
        {mapLayers?.weather && (
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Cloud" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">72°F</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Partly Cloudy</p>
          </div>
        )}
      </div>
      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setMapCenter({ lat: 40.7128, lng: -74.0060 })}
          className="w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
        >
          <Icon name="RotateCcw" size={16} color="var(--color-foreground)" />
        </button>
        <button className="w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Icon name="Plus" size={16} color="var(--color-foreground)" />
        </button>
        <button className="w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Icon name="Minus" size={16} color="var(--color-foreground)" />
        </button>
      </div>
      {/* Layer Toggle */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="flex space-x-2">
          <button
            onClick={() => onLayerToggle('trains')}
            className={`p-2 rounded-md transition-colors ${mapLayers?.trains ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >
            <Icon name="Train" size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => onLayerToggle('accessibility')}
            className={`p-2 rounded-md transition-colors ${mapLayers?.accessibility ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >
            <Icon name="Accessibility" size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => onLayerToggle('weather')}
            className={`p-2 rounded-md transition-colors ${mapLayers?.weather ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >
            <Icon name="Cloud" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
      {/* Train Detail Popup */}
      {selectedTrain && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-card rounded-lg shadow-xl p-4 min-w-80 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getTrainStatusColor(selectedTrain?.status)}`} />
              <h3 className="font-inter font-semibold text-foreground">{selectedTrain?.line}</h3>
            </div>
            <button
              onClick={() => setSelectedTrain(null)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <Icon name="X" size={16} color="var(--color-muted-foreground)" />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Next Stop:</span>
              <span className="text-sm font-medium text-foreground">{selectedTrain?.nextStop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className={`text-sm font-medium capitalize ${
                selectedTrain?.status === 'on-time' ? 'text-status-green' :
                selectedTrain?.status === 'delayed'? 'text-delay-amber' : 'text-disruption-red'
              }`}>
                {selectedTrain?.status === 'on-time' ? 'On Time' : selectedTrain?.status}
              </span>
            </div>
            {selectedTrain?.delay > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Delay:</span>
                <span className="text-sm font-medium text-delay-amber">{selectedTrain?.delay} min</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Capacity:</span>
              <span className="text-sm font-medium text-foreground">{selectedTrain?.capacity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Direction:</span>
              <span className="text-sm font-medium text-foreground">{selectedTrain?.direction}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;