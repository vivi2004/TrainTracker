import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MapContainer from './components/MapContainer';
import RouteCard from './components/RouteCard';
import NotificationPanel from './components/NotificationPanel';
import QuickFilters from './components/QuickFilters';
import LiveStatusBar from './components/LiveStatusBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const LiveTrackingDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [mapLayers, setMapLayers] = useState({
    trains: true,
    accessibility: false,
    weather: false,
    crowdDensity: false
  });

  // Mock data for saved routes
  const [savedRoutes, setSavedRoutes] = useState([
    {
      id: 'route_001',
      name: 'Morning Commute',
      from: 'Grand Central',
      to: 'Brooklyn Bridge',
      status: 'on-time',
      delay: 0,
      nextDeparture: '8:15 AM',
      predictedArrival: '8:42 AM',
      communityUpdates: 2,
      capacity: 65,
      isFavorite: true
    },
    {
      id: 'route_002',
      name: 'Evening Return',
      from: 'Brooklyn Bridge',
      to: 'Grand Central',
      status: 'delayed',
      delay: 5,
      nextDeparture: '6:20 PM',
      predictedArrival: '6:52 PM',
      communityUpdates: 4,
      capacity: 85,
      isFavorite: true
    },
    {
      id: 'route_003',
      name: 'Weekend Express',
      from: 'Times Square',
      to: 'JFK Airport',
      status: 'on-time',
      delay: 0,
      nextDeparture: '10:30 AM',
      predictedArrival: '11:15 AM',
      communityUpdates: 0,
      capacity: 45,
      isFavorite: false
    },
    {
      id: 'route_004',
      name: 'Late Night Service',
      from: 'Union Square',
      to: 'Queens Plaza',
      status: 'disrupted',
      delay: 0,
      nextDeparture: 'Service Suspended',
      predictedArrival: 'N/A',
      communityUpdates: 8,
      capacity: 0,
      isFavorite: false
    }
  ]);

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 'notif_001',
      type: 'delay',
      title: 'Blue Line Delayed',
      message: 'Your morning commute route is experiencing a 5-minute delay due to signal issues at 42nd Street.',
      timestamp: new Date(Date.now() - 300000),
      route: 'Morning Commute',
      isRead: false
    },
    {
      id: 'notif_002',
      type: 'community',
      title: 'Community Update',
      message: 'Fellow commuter reports crowded conditions on the 8:15 AM departure. Consider the 8:20 AM alternative.',
      timestamp: new Date(Date.now() - 600000),
      route: 'Morning Commute',
      isRead: false
    },
    {
      id: 'notif_003',
      type: 'disruption',
      title: 'Service Alert',
      message: 'Late night service on Orange Line suspended due to maintenance work. Alternative routes available.',
      timestamp: new Date(Date.now() - 1800000),
      route: 'Late Night Service',
      isRead: true
    },
    {
      id: 'notif_004',
      type: 'update',
      title: 'Route Optimization',
      message: 'We found a faster route for your evening commute that saves 8 minutes. Check it out!',
      timestamp: new Date(Date.now() - 3600000),
      route: 'Evening Return',
      isRead: false
    }
  ]);

  // System status data
  const [systemStatus, setSystemStatus] = useState({
    status: 'operational',
    alerts: []
  });

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    // Auto-refresh data every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleTrainSelect = (train) => {
    console.log('Selected train:', train);
  };

  const handleToggleFavorite = (routeId) => {
    setSavedRoutes(routes => 
      routes?.map(route => 
        route?.id === routeId 
          ? { ...route, isFavorite: !route?.isFavorite }
          : route
      )
    );
  };

  const handleFilterChange = (filterKey, values) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: values
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleLayerToggle = (layer) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev?.[layer]
    }));
  };

  const handleMarkAsRead = (notificationId) => {
    if (notificationId === 'all') {
      setNotifications(notifications?.map(n => ({ ...n, isRead: true })));
    } else {
      setNotifications(notifications?.map(n => 
        n?.id === notificationId ? { ...n, isRead: true } : n
      ));
    }
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleRefreshData = () => {
    setLastUpdate(Date.now());
    // Simulate data refresh
    console.log('Refreshing live data...');
  };

  const unreadNotifications = notifications?.filter(n => !n?.isRead)?.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 flex h-screen">
        {/* Left Sidebar */}
        <div className={`bg-card border-r border-border transition-all duration-300 flex flex-col ${
          isSidebarCollapsed ? 'w-16' : 'w-80'
        }`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <h2 className="text-lg font-inter font-semibold text-foreground">
                  My Routes
                </h2>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon 
                  name={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"} 
                  size={16} 
                  color="var(--color-muted-foreground)" 
                />
              </button>
            </div>
          </div>

          {!isSidebarCollapsed && (
            <>
              {/* Quick Actions */}
              <div className="p-4 border-b border-border">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Add Route
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Search"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Find
                  </Button>
                </div>
              </div>

              {/* Routes List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {savedRoutes?.map((route) => (
                  <RouteCard
                    key={route?.id}
                    route={route}
                    isSelected={selectedRoute?.id === route?.id}
                    onClick={() => handleRouteSelect(route)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-border">
                <LiveStatusBar
                  systemStatus={systemStatus}
                  lastUpdate={lastUpdate}
                  onRefresh={handleRefreshData}
                />
              </div>
            </>
          )}

          {isSidebarCollapsed && (
            <div className="flex flex-col items-center py-4 space-y-4">
              <button className="p-3 hover:bg-muted rounded-lg transition-colors">
                <Icon name="Plus" size={20} color="var(--color-muted-foreground)" />
              </button>
              <button className="p-3 hover:bg-muted rounded-lg transition-colors">
                <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
              </button>
              <button className="p-3 hover:bg-muted rounded-lg transition-colors">
                <Icon name="Heart" size={20} color="var(--color-muted-foreground)" />
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Controls */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-inter font-bold text-foreground">
                  Live Tracking Dashboard
                </h1>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-status-green/10 rounded-full">
                  <div className="w-2 h-2 bg-status-green rounded-full status-breathing" />
                  <span className="text-sm font-medium text-status-green">Live Updates</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Map Layer Controls */}
                <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => handleLayerToggle('trains')}
                    className={`p-2 rounded-md transition-colors ${
                      mapLayers?.trains ? 'bg-primary text-primary-foreground' : 'hover:bg-muted-foreground/10'
                    }`}
                    title="Toggle train positions"
                  >
                    <Icon name="Train" size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => handleLayerToggle('accessibility')}
                    className={`p-2 rounded-md transition-colors ${
                      mapLayers?.accessibility ? 'bg-primary text-primary-foreground' : 'hover:bg-muted-foreground/10'
                    }`}
                    title="Toggle accessibility info"
                  >
                    <Icon name="Accessibility" size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => handleLayerToggle('weather')}
                    className={`p-2 rounded-md transition-colors ${
                      mapLayers?.weather ? 'bg-primary text-primary-foreground' : 'hover:bg-muted-foreground/10'
                    }`}
                    title="Toggle weather overlay"
                  >
                    <Icon name="Cloud" size={16} strokeWidth={2} />
                  </button>
                </div>

                {/* Notifications */}
                <button
                  onClick={() => setIsNotificationPanelOpen(true)}
                  className="relative p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon name="Bell" size={20} color="var(--color-foreground)" strokeWidth={2} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Refresh */}
                <button
                  onClick={handleRefreshData}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Refresh data"
                >
                  <Icon name="RefreshCw" size={20} color="var(--color-foreground)" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Map and Filters */}
          <div className="flex-1 flex">
            {/* Map Container */}
            <div className="flex-1 p-4">
              <MapContainer
                selectedRoute={selectedRoute}
                onTrainSelect={handleTrainSelect}
                mapLayers={mapLayers}
                onLayerToggle={handleLayerToggle}
              />
            </div>

            {/* Right Panel - Filters */}
            <div className="w-80 p-4 border-l border-border bg-card overflow-y-auto">
              <QuickFilters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAll={handleClearAllNotifications}
      />
      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 lg:hidden">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1">
            <Icon name="Map" size={20} color="var(--color-primary)" strokeWidth={2} />
            <span className="text-xs font-medium text-primary">Map</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Icon name="Route" size={20} color="var(--color-muted-foreground)" strokeWidth={2} />
            <span className="text-xs font-medium text-muted-foreground">Routes</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Icon name="Filter" size={20} color="var(--color-muted-foreground)" strokeWidth={2} />
            <span className="text-xs font-medium text-muted-foreground">Filters</span>
          </button>
          <button 
            onClick={() => setIsNotificationPanelOpen(true)}
            className="flex flex-col items-center space-y-1 relative"
          >
            <Icon name="Bell" size={20} color="var(--color-muted-foreground)" strokeWidth={2} />
            <span className="text-xs font-medium text-muted-foreground">Alerts</span>
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingDashboard;