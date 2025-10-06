import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ServiceAnnouncementCard from './components/ServiceAnnouncementCard';
import MaintenanceCalendar from './components/MaintenanceCalendar';
import ServiceStatusBoard from './components/ServiceStatusBoard';
import AccessibilityInfo from './components/AccessibilityInfo';
import EmergencyProcedures from './components/EmergencyProcedures';
import OfficialDataSync from './components/OfficialDataSync';

const TransitAuthorityIntegration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for service announcements
  const serviceAnnouncements = [
    {
      id: 1,
      title: "Weekend Service Changes - Blue Line",
      message: "Blue Line service will operate on a modified schedule this weekend due to track maintenance between Downtown and Airport stations. Additional shuttle buses will be available.",
      priority: "high",
      timestamp: "2 hours ago",
      affectedLines: ["Blue Line", "Express Blue"],
      actionRequired: "Plan extra 15-20 minutes for your journey"
    },
    {
      id: 2,
      title: "New Mobile Ticketing System Launch",
      message: "Starting Monday, passengers can purchase and validate tickets directly through the official transit app. Paper tickets will remain available at all stations.",
      priority: "medium",
      timestamp: "5 hours ago",
      affectedLines: ["All Lines"],
      actionRequired: "Download the official app for convenience"
    },
    {
      id: 3,
      title: "Emergency Alert - Red Line Suspended",
      message: "Red Line service is currently suspended between Central Station and North Terminal due to a signal malfunction. Emergency shuttle buses are operating every 10 minutes.",
      priority: "critical",
      timestamp: "15 minutes ago",
      affectedLines: ["Red Line"],
      actionRequired: "Use alternative routes or shuttle service"
    }
  ];

  // Mock data for maintenance calendar
  const maintenanceEvents = [
    {
      id: 1,
      title: "Track Renewal Project",
      description: "Complete track replacement and signal upgrades on the Blue Line between Downtown and Airport stations.",
      startDate: "2025-01-15",
      endDate: "2025-01-17",
      impact: "high",
      duration: "72 hours",
      location: "Blue Line - Downtown to Airport",
      alternativeRoute: true
    },
    {
      id: 2,
      title: "Station Platform Maintenance",
      description: "Platform resurfacing and accessibility improvements at Central Station.",
      startDate: "2025-01-16",
      endDate: "2025-01-16",
      impact: "medium",
      duration: "8 hours",
      location: "Central Station",
      alternativeRoute: false
    },
    {
      id: 3,
      title: "Elevator Maintenance",
      description: "Scheduled maintenance on elevators at North Terminal and South Station.",
      startDate: "2025-01-18",
      endDate: "2025-01-18",
      impact: "low",
      duration: "4 hours",
      location: "North Terminal, South Station",
      alternativeRoute: false
    }
  ];

  // Mock data for service status
  const serviceLines = [
    {
      name: "Blue Line",
      route: "Downtown ↔ Airport",
      color: "#1E40AF",
      status: "on-time",
      nextTrain: "3 min",
      crowding: "Light",
      frequency: "Every 5 min",
      alerts: [],
      lastUpdate: "30 sec ago"
    },
    {
      name: "Red Line",
      route: "North Terminal ↔ South Station",
      color: "#DC2626",
      status: "disrupted",
      nextTrain: "Shuttle Bus",
      crowding: "N/A",
      frequency: "Every 10 min",
      alerts: ["Signal malfunction - shuttle buses operating"],
      lastUpdate: "2 min ago"
    },
    {
      name: "Green Line",
      route: "East Side ↔ West End",
      color: "#16A34A",
      status: "delayed",
      nextTrain: "8 min",
      crowding: "Moderate",
      frequency: "Every 7 min",
      alerts: ["Minor delays due to increased passenger volume"],
      lastUpdate: "1 min ago"
    },
    {
      name: "Yellow Line",
      route: "University ↔ Business District",
      color: "#EAB308",
      status: "on-time",
      nextTrain: "2 min",
      crowding: "Heavy",
      frequency: "Every 4 min",
      alerts: [],
      lastUpdate: "45 sec ago"
    }
  ];

  // Mock data for accessibility information
  const accessibilityData = [
    {
      name: "Central Station",
      address: "123 Main Street, Downtown",
      elevators: [
        { location: "Platform A", serves: "Street to Platform", status: "operational" },
        { location: "Platform B", serves: "Street to Platform", status: "operational" },
        { location: "Concourse", serves: "Mezzanine to Platform", status: "maintenance" }
      ],
      platformAccess: true,
      accessibleParking: true,
      tactileStrips: true,
      brailleSignage: true,
      wideGates: true,
      assistanceAvailable: true,
      audioAnnouncements: true,
      accessibilityContact: "(555) 123-4567",
      lastUpdate: "2 min ago"
    },
    {
      name: "Airport Terminal",
      address: "Airport Boulevard, Terminal 1",
      elevators: [
        { location: "Main Entrance", serves: "Ground to Platform", status: "operational" },
        { location: "Terminal Link", serves: "Platform to Terminal", status: "operational" }
      ],
      platformAccess: true,
      accessibleParking: true,
      tactileStrips: true,
      brailleSignage: true,
      wideGates: true,
      assistanceAvailable: true,
      audioAnnouncements: true,
      accessibilityContact: "(555) 123-4567",
      lastUpdate: "1 min ago"
    },
    {
      name: "University Station",
      address: "University Avenue & College Street",
      elevators: [
        { location: "North Entrance", serves: "Street to Platform", status: "out-of-service" }
      ],
      platformAccess: false,
      accessibleParking: false,
      tactileStrips: true,
      brailleSignage: false,
      wideGates: false,
      assistanceAvailable: true,
      audioAnnouncements: true,
      accessibilityContact: "(555) 123-4567",
      lastUpdate: "5 min ago"
    }
  ];

  // Mock data for emergency information
  const emergencyInfo = {
    procedures: [
      {
        title: "Fire Emergency",
        scenario: "In case of fire or smoke detection",
        priority: "critical",
        icon: "Flame",
        steps: [
          "Remain calm and do not panic",
          "Follow illuminated exit signs to the nearest emergency exit",
          "Do not use elevators during fire emergencies",
          "Proceed to the designated assembly area outside the station",
          "Wait for instructions from emergency personnel"
        ],
        importantNote: "If trapped, stay low to avoid smoke inhalation and call emergency services"
      },
      {
        title: "Medical Emergency",
        scenario: "When someone requires immediate medical attention",
        priority: "high",
        icon: "Heart",
        steps: [
          "Call emergency services immediately (911)",
          "Alert transit staff using emergency call buttons",
          "Do not move the injured person unless they are in immediate danger",
          "Provide first aid only if you are trained to do so",
          "Clear the area to allow emergency responders access"
        ],
        importantNote: "AED devices are located at all major stations"
      },
      {
        title: "Suspicious Activity",
        scenario: "If you notice suspicious behavior or unattended items",
        priority: "medium",
        icon: "Eye",
        steps: [
          "Do not approach or touch suspicious items",
          "Report immediately to transit police or staff",
          "Move away from the area calmly",
          "Provide detailed description of what you observed",
          "Follow instructions from security personnel"
        ],
        importantNote: "See something, say something - your vigilance helps keep everyone safe"
      }
    ],
    contacts: [
      {
        department: "Transit Police",
        description: "Emergency law enforcement and security",
        number: "911",
        availability: "24/7",
        icon: "Shield",
        additionalInfo: "For immediate emergencies and security threats"
      },
      {
        department: "Customer Service",
        description: "General assistance and information",
        number: "(555) 123-HELP",
        availability: "5:00 AM - 12:00 AM",
        icon: "Phone",
        additionalInfo: "For service information, lost items, and general inquiries"
      },
      {
        department: "Accessibility Services",
        description: "Assistance for passengers with disabilities",
        number: "(555) 123-ACCESS",
        availability: "6:00 AM - 10:00 PM",
        icon: "Accessibility",
        additionalInfo: "24-hour advance notice recommended for special assistance"
      },
      {
        department: "Maintenance Hotline",
        description: "Report facility issues and maintenance needs",
        number: "(555) 123-MAINT",
        availability: "24/7",
        icon: "Settings",
        additionalInfo: "For reporting broken elevators, lighting issues, and facility problems"
      }
    ],
    evacuationRoutes: [
      {
        station: "Central Station",
        platforms: ["Platform A", "Platform B", "Platform C"],
        capacity: "5,000 people",
        estimatedTime: "8-12 minutes",
        accessible: true,
        steps: [
          "Exit trains immediately when instructed",
          "Follow green emergency lighting to exits",
          "Use stairs - elevators will be disabled",
          "Proceed to Main Street assembly area",
          "Wait for further instructions from emergency personnel"
        ]
      },
      {
        station: "Airport Terminal",
        platforms: ["Platform 1", "Platform 2"],
        capacity: "3,000 people",
        estimatedTime: "5-8 minutes",
        accessible: true,
        steps: [
          "Exit trains and move toward terminal exits",
          "Follow airport evacuation procedures",
          "Proceed to designated outdoor assembly areas",
          "Do not return to retrieve personal items",
          "Coordinate with airport security personnel"
        ]
      }
    ],
    medicalAssistance: [
      {
        type: "First Aid Stations",
        description: "Basic medical supplies and AED devices",
        locations: ["Central Station", "Airport Terminal", "University Station"],
        contact: "(555) 123-MEDICAL",
        availability: "24/7 automated, staffed 6 AM - 10 PM"
      },
      {
        type: "Emergency Medical Services",
        description: "Paramedic response and ambulance service",
        locations: ["All stations - mobile response"],
        contact: "911",
        availability: "24/7"
      }
    ]
  };

  // Mock data for sync status
  const syncStatus = {
    totalAPIs: 12,
    successfulSyncs: 11,
    dataTransferred: 2547891234,
    lastSync: "30 sec ago",
    dataQuality: {
      accuracy: 99.7,
      freshness: 15,
      completeness: 98.2
    },
    apis: [
      {
        name: "Real-Time Vehicle Positions",
        description: "Live train locations and movement data",
        icon: "Train",
        status: "connected",
        syncFrequency: "Every 15 seconds",
        latency: 120,
        uptime: 99.8,
        recordCount: 1247,
        dataTypes: ["Vehicle Position", "Speed", "Direction", "Occupancy"],
        endpoint: "https://api.transit.gov/gtfs-realtime/vehicle-positions",
        version: "v2.0",
        authType: "API Key",
        rateLimit: "1000 req/min",
        recentActivity: [
          { action: "Data sync completed", timestamp: "30 seconds ago" },
          { action: "1,247 records updated", timestamp: "45 seconds ago" },
          { action: "Connection established", timestamp: "2 minutes ago" }
        ]
      },
      {
        name: "Service Alerts & Announcements",
        description: "Official service disruptions and notifications",
        icon: "AlertTriangle",
        status: "connected",
        syncFrequency: "Every 2 minutes",
        latency: 89,
        uptime: 99.9,
        recordCount: 23,
        dataTypes: ["Service Alerts", "Planned Disruptions", "Emergency Notices"],
        endpoint: "https://api.transit.gov/gtfs-realtime/alerts",
        version: "v2.0",
        authType: "OAuth 2.0",
        rateLimit: "500 req/min",
        recentActivity: [
          { action: "3 new alerts received", timestamp: "1 minute ago" },
          { action: "Alert severity updated", timestamp: "3 minutes ago" },
          { action: "Data validation passed", timestamp: "5 minutes ago" }
        ]
      },
      {
        name: "Schedule & Trip Updates",
        description: "Real-time schedule adherence and delays",
        icon: "Clock",
        status: "syncing",
        syncFrequency: "Every 30 seconds",
        latency: 156,
        uptime: 99.5,
        recordCount: 8934,
        dataTypes: ["Trip Updates", "Delay Information", "Schedule Adherence"],
        endpoint: "https://api.transit.gov/gtfs-realtime/trip-updates",
        version: "v2.0",
        authType: "API Key",
        rateLimit: "2000 req/min",
        recentActivity: [
          { action: "Syncing in progress...", timestamp: "Now" },
          { action: "8,934 trips updated", timestamp: "30 seconds ago" },
          { action: "Delay calculations refreshed", timestamp: "1 minute ago" }
        ]
      },
      {
        name: "Station Facilities Status",
        description: "Elevator, escalator, and accessibility information",
        icon: "Building2",
        status: "connected",
        syncFrequency: "Every 5 minutes",
        latency: 203,
        uptime: 98.7,
        recordCount: 456,
        dataTypes: ["Elevator Status", "Escalator Status", "Accessibility Features"],
        endpoint: "https://api.transit.gov/facilities/status",
        version: "v1.2",
        authType: "API Key",
        rateLimit: "200 req/min",
        recentActivity: [
          { action: "Facility status updated", timestamp: "2 minutes ago" },
          { action: "Elevator maintenance alert", timestamp: "15 minutes ago" },
          { action: "456 facilities monitored", timestamp: "20 minutes ago" }
        ],
        errors: [
          { message: "Timeout connecting to elevator sensor at Central Station", timestamp: "1 hour ago" }
        ]
      }
    ]
  };

  const tabItems = [
    { key: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { key: 'announcements', label: 'Announcements', icon: 'Megaphone' },
    { key: 'maintenance', label: 'Maintenance', icon: 'Calendar' },
    { key: 'status', label: 'Service Status', icon: 'Monitor' },
    { key: 'accessibility', label: 'Accessibility', icon: 'Accessibility' },
    { key: 'emergency', label: 'Emergency Info', icon: 'Shield' },
    { key: 'integration', label: 'Data Integration', icon: 'Database' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg bg-status-green/10 border border-status-green/20">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={24} className="text-status-green" />
                  <div>
                    <div className="text-2xl font-bold text-status-green">3/4</div>
                    <div className="text-sm text-muted-foreground">Lines Operating</div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center space-x-3">
                  <Icon name="Database" size={24} className="text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">API Connections</div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-delay-amber/10 border border-delay-amber/20">
                <div className="flex items-center space-x-3">
                  <Icon name="AlertTriangle" size={24} className="text-delay-amber" />
                  <div>
                    <div className="text-2xl font-bold text-delay-amber">3</div>
                    <div className="text-sm text-muted-foreground">Active Alerts</div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-transit-blue/10 border border-transit-blue/20">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={24} className="text-transit-blue" />
                  <div>
                    <div className="text-2xl font-bold text-transit-blue">99.7%</div>
                    <div className="text-sm text-muted-foreground">Data Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Announcements */}
            <div>
              <h3 className="text-lg font-inter font-semibold text-foreground mb-4">Recent Official Announcements</h3>
              <div className="space-y-4">
                {serviceAnnouncements?.slice(0, 2)?.map((announcement) => (
                  <ServiceAnnouncementCard key={announcement?.id} announcement={announcement} />
                ))}
              </div>
            </div>
            {/* Service Status Overview */}
            <ServiceStatusBoard serviceLines={serviceLines} />
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-inter font-semibold text-foreground">Official Service Announcements</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>Verified by Transit Authority</span>
              </div>
            </div>
            {serviceAnnouncements?.map((announcement) => (
              <ServiceAnnouncementCard key={announcement?.id} announcement={announcement} />
            ))}
          </div>
        );
      case 'maintenance':
        return <MaintenanceCalendar maintenanceEvents={maintenanceEvents} />;
      case 'status':
        return <ServiceStatusBoard serviceLines={serviceLines} />;
      case 'accessibility':
        return <AccessibilityInfo accessibilityData={accessibilityData} />;
      case 'emergency':
        return <EmergencyProcedures emergencyInfo={emergencyInfo} />;
      case 'integration':
        return <OfficialDataSync syncStatus={syncStatus} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-primary to-transit-blue-light text-primary-foreground">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Icon name="Building2" size={32} color="white" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-3xl font-inter font-bold mb-2">
                    Transit Authority Integration
                  </h1>
                  <p className="text-lg text-primary-foreground/80 mb-4">
                    Official data and verified information from transit authorities
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-status-green rounded-full status-breathing" />
                      <span>Live Data Feed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} />
                      <span>Official Partnership</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} />
                      <span>Updated {currentTime?.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="text-right">
                  <div className="text-3xl font-bold">{serviceLines?.filter(line => line?.status === 'on-time')?.length}/{serviceLines?.length}</div>
                  <div className="text-sm text-primary-foreground/80">Lines On Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transit-transition ${
                    activeTab === tab?.key
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} strokeWidth={2} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default TransitAuthorityIntegration;