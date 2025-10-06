import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityInsights = () => {
  const [activeTab, setActiveTab] = useState('reports');

  const delayReports = [
    {
      id: 1,
      user: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face",
      route: "Blue Line - Downtown",
      type: "delay",
      message: "15-minute delay at Central Station due to signal maintenance. Consider Red Line alternative.",
      timestamp: "2 minutes ago",
      helpful: 23,
      verified: true
    },
    {
      id: 2,
      user: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      route: "Green Line - Eastbound",
      type: "crowding",
      message: "Heavy crowding on 8:15 AM train. Next train at 8:22 AM has more space available.",
      timestamp: "5 minutes ago",
      helpful: 18,
      verified: true
    },
    {
      id: 3,
      user: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      route: "Red Line - Northbound",
      type: "service",
      message: "Express service running on time. Great alternative to avoid downtown construction delays.",
      timestamp: "8 minutes ago",
      helpful: 31,
      verified: false
    }
  ];

  const routeTips = [
    {
      id: 1,
      user: "Sarah Kim",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      title: "Best Morning Route to Financial District",
      tip: "Take the 7:45 AM Blue Line instead of 8:00 AM. Consistently 10 minutes faster and less crowded.",
      route: "Suburban → Financial District",
      saves: "10 min",
      likes: 45,
      timestamp: "1 hour ago"
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      title: "Rainy Day Alternative",
      tip: "During heavy rain, underground Red Line is more reliable than elevated Green Line. Worth the extra 5-minute walk.",
      route: "University → Downtown",
      saves: "15 min",
      likes: 38,
      timestamp: "3 hours ago"
    },
    {
      id: 3,
      user: "Lisa Rodriguez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      title: "Weekend Service Hack",
      tip: "Weekends: Yellow Line runs every 15 min vs Blue Line every 20 min. Better for spontaneous trips.",
      route: "Various Routes",
      saves: "5 min",
      likes: 29,
      timestamp: "5 hours ago"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'delay': return 'Clock';
      case 'crowding': return 'Users';
      case 'service': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'delay': return 'text-delay-amber';
      case 'crowding': return 'text-disruption-red';
      case 'service': return 'text-status-green';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-bold text-foreground mb-6">
            Community-Powered Intelligence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time updates and insider tips from fellow commuters who know the system best
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-md font-inter font-medium transit-transition ${
                activeTab === 'reports' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Live Reports
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-3 rounded-md font-inter font-medium transit-transition ${
                activeTab === 'tips' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Route Tips
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'reports' && (
            <div className="space-y-6">
              {delayReports?.map((report) => (
                <div key={report?.id} className="bg-card rounded-xl p-6 info-layer">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Image
                        src={report?.avatar}
                        alt={report?.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {report?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-status-green rounded-full flex items-center justify-center border-2 border-card">
                          <Icon name="Check" size={10} color="white" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-inter font-semibold text-foreground">
                            {report?.user}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {report?.route}
                          </span>
                          <div className={`flex items-center space-x-1 ${getTypeColor(report?.type)}`}>
                            <Icon name={getTypeIcon(report?.type)} size={16} />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {report?.timestamp}
                        </span>
                      </div>

                      <p className="text-foreground leading-relaxed">
                        {report?.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transit-transition">
                          <Icon name="ThumbsUp" size={16} />
                          <span className="text-sm font-medium">{report?.helpful} helpful</span>
                        </button>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <button className="hover:text-foreground transit-transition">Reply</button>
                          <button className="hover:text-foreground transit-transition">Share</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              {routeTips?.map((tip) => (
                <div key={tip?.id} className="bg-card rounded-xl p-6 info-layer">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={tip?.avatar}
                      alt={tip?.user}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-inter font-bold text-foreground">
                          {tip?.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="bg-status-green/10 px-3 py-1 rounded-full">
                            <span className="text-xs font-inter font-bold text-status-green">
                              Saves {tip?.saves}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <span className="font-medium">{tip?.user}</span>
                        <span>•</span>
                        <span>{tip?.route}</span>
                        <span>•</span>
                        <span>{tip?.timestamp}</span>
                      </div>

                      <p className="text-foreground leading-relaxed">
                        {tip?.tip}
                      </p>

                      <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transit-transition">
                          <Icon name="Heart" size={16} />
                          <span className="text-sm font-medium">{tip?.likes} likes</span>
                        </button>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <button className="hover:text-foreground transit-transition">Save</button>
                          <button className="hover:text-foreground transit-transition">Share</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Community Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-2xl font-inter font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">Active Contributors</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-inter font-bold text-safety-orange">15,632</div>
              <div className="text-sm text-muted-foreground">Reports This Week</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-inter font-bold text-status-green">94%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityInsights;