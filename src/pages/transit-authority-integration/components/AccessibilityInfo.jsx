import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AccessibilityInfo = ({ accessibilityData }) => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, elevator, platform, parking

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-status-green bg-green-50 border-green-200';
      case 'maintenance':
        return 'text-delay-amber bg-amber-50 border-amber-200';
      case 'out-of-service':
        return 'text-disruption-red bg-red-50 border-red-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'maintenance':
        return 'Settings';
      case 'out-of-service':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const filteredStations = accessibilityData?.filter(station => {
    if (filterType === 'all') return true;
    if (filterType === 'elevator') return station?.elevators && station?.elevators?.length > 0;
    if (filterType === 'platform') return station?.platformAccess;
    if (filterType === 'parking') return station?.accessibleParking;
    return true;
  });

  return (
    <div className="bg-card rounded-lg border transit-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Accessibility" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-inter font-semibold text-foreground">
                Accessibility Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Real-time accessibility status and barrier-free routes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Official Data</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All Stations', icon: 'MapPin' },
            { key: 'elevator', label: 'Elevators', icon: 'ArrowUpDown' },
            { key: 'platform', label: 'Platform Access', icon: 'Train' },
            { key: 'parking', label: 'Accessible Parking', icon: 'Car' }
          ]?.map((filter) => (
            <button
              key={filter?.key}
              onClick={() => setFilterType(filter?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transit-transition ${
                filterType === filter?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>

        {/* Stations Grid */}
        <div className="grid gap-4">
          {filteredStations?.map((station, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transit-transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                    <Icon name="MapPin" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-foreground">
                      {station?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {station?.address}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStation(selectedStation === index ? null : index)}
                  className="p-2 rounded-lg hover:bg-muted transit-transition"
                >
                  <Icon 
                    name={selectedStation === index ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </button>
              </div>

              {/* Quick Status Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Elevators:</span>
                  <span className={`text-sm font-medium ${
                    station?.elevators?.every(e => e?.status === 'operational') 
                      ? 'text-status-green' :'text-delay-amber'
                  }`}>
                    {station?.elevators?.filter(e => e?.status === 'operational')?.length || 0}/
                    {station?.elevators?.length || 0}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Train" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Platform:</span>
                  <span className={`text-sm font-medium ${
                    station?.platformAccess ? 'text-status-green' : 'text-disruption-red'
                  }`}>
                    {station?.platformAccess ? 'Accessible' : 'Limited'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Car" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Parking:</span>
                  <span className={`text-sm font-medium ${
                    station?.accessibleParking ? 'text-status-green' : 'text-muted-foreground'
                  }`}>
                    {station?.accessibleParking ? 'Available' : 'None'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Volume2" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Audio:</span>
                  <span className={`text-sm font-medium ${
                    station?.audioAnnouncements ? 'text-status-green' : 'text-muted-foreground'
                  }`}>
                    {station?.audioAnnouncements ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Detailed Information (Expandable) */}
              {selectedStation === index && (
                <div className="pt-4 border-t border-border space-y-4">
                  {/* Elevators Detail */}
                  {station?.elevators && station?.elevators?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3 flex items-center">
                        <Icon name="ArrowUpDown" size={16} className="mr-2" />
                        Elevator Status
                      </h4>
                      <div className="grid gap-2">
                        {station?.elevators?.map((elevator, elevatorIndex) => (
                          <div key={elevatorIndex} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-foreground">
                                {elevator?.location}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {elevator?.serves}
                              </span>
                            </div>
                            <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(elevator?.status)}`}>
                              <Icon name={getStatusIcon(elevator?.status)} size={12} />
                              <span className="capitalize">{elevator?.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Features */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center">
                      <Icon name="Heart" size={16} className="mr-2" />
                      Accessibility Features
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { feature: 'Tactile Strips', available: station?.tactileStrips },
                        { feature: 'Braille Signage', available: station?.brailleSignage },
                        { feature: 'Wide Gates', available: station?.wideGates },
                        { feature: 'Assistance Available', available: station?.assistanceAvailable }
                      ]?.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <Icon 
                            name={item?.available ? "Check" : "X"} 
                            size={14} 
                            className={item?.available ? "text-status-green" : "text-muted-foreground"} 
                          />
                          <span className={`text-sm ${
                            item?.available ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {item?.feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  {station?.accessibilityContact && (
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Accessibility Support:</span>
                        <span className="text-primary font-medium">{station?.accessibilityContact}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Last Updated */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-status-green rounded-full status-breathing" />
                    <span>Live Data</span>
                  </div>
                  <span>Updated {station?.lastUpdate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessibilityInfo;