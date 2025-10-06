import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CommunityFeed from './components/CommunityFeed';
import QuickReportModal from './components/QuickReportModal';
import CommuterGroups from './components/CommuterGroups';
import CommuterSpotlight from './components/CommuterSpotlight';
import RealtimePolling from './components/RealtimePolling';

const CommunityNetwork = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const navigationTabs = [
    { id: 'feed', label: 'Community Feed', icon: 'MessageSquare' },
    { id: 'groups', label: 'Commuter Groups', icon: 'Users' },
    { id: 'polls', label: 'Live Polls', icon: 'BarChart3' },
    { id: 'spotlight', label: 'Spotlight', icon: 'Star' }
  ];

  const communityStats = [
    { label: 'Active Members', value: '12,847', icon: 'Users', color: 'text-primary' },
    { label: 'Reports Today', value: '234', icon: 'AlertCircle', color: 'text-safety-orange' },
    { label: 'Tips Shared', value: '1,456', icon: 'Lightbulb', color: 'text-status-green' },
    { label: 'Routes Optimized', value: '89', icon: 'TrendingUp', color: 'text-delay-amber' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'feed':
        return <CommunityFeed />;
      case 'groups':
        return <CommuterGroups />;
      case 'polls':
        return <RealtimePolling />;
      case 'spotlight':
        return <CommuterSpotlight />;
      default:
        return <CommunityFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-safety-orange/5 to-status-green/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Users" size={32} className="text-primary" strokeWidth={2} />
                <h1 className="text-4xl font-bold text-foreground">Community Network</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with fellow commuters, share real-time updates, and build a smarter transit community together
              </p>
              
              {/* Community Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
                {communityStats?.map((stat, index) => (
                  <div key={index} className="bg-card rounded-lg border border-border p-4 text-center transit-elevation">
                    <Icon name={stat?.icon} size={24} className={`mx-auto mb-2 ${stat?.color}`} strokeWidth={2} />
                    <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                    <div className="text-sm text-muted-foreground">{stat?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Quick Actions */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              {/* Tab Navigation */}
              <nav className="flex space-x-1">
                {navigationTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} strokeWidth={2} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsReportModalOpen(true)}
                  className="shadow-sm"
                >
                  <Icon name="Plus" size={16} strokeWidth={2} className="mr-2" />
                  Quick Report
                </Button>
                
                <Button variant="outline" size="sm">
                  <Icon name="Search" size={16} strokeWidth={2} className="mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {renderActiveTab()}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Real-time Activity */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-status-green rounded-full status-breathing"></div>
                  <h3 className="font-semibold text-foreground">Live Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Icon name="MessageCircle" size={16} className="text-primary" strokeWidth={2} />
                    <span className="text-muted-foreground">Sarah posted in Blue Line group</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Icon name="AlertTriangle" size={16} className="text-safety-orange" strokeWidth={2} />
                    <span className="text-muted-foreground">New delay report on Green Line</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Icon name="ThumbsUp" size={16} className="text-status-green" strokeWidth={2} />
                    <span className="text-muted-foreground">Mike's tip got 50 likes</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Icon name="Users" size={16} className="text-delay-amber" strokeWidth={2} />
                    <span className="text-muted-foreground">15 new members joined today</span>
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Trending Topics</h3>
                <div className="space-y-2">
                  {[
                    { tag: '#BlueLineDelays', posts: 23 },
                    { tag: '#WeekendService', posts: 18 },
                    { tag: '#AccessibilityTips', posts: 15 },
                    { tag: '#RushHourHacks', posts: 12 },
                    { tag: '#WeatherAlerts', posts: 9 }
                  ]?.map((topic, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <span className="text-sm font-medium text-primary">{topic?.tag}</span>
                      <span className="text-xs text-muted-foreground">{topic?.posts} posts</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-status-green mt-0.5" strokeWidth={2} />
                    <span>Share accurate, helpful information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-status-green mt-0.5" strokeWidth={2} />
                    <span>Be respectful to fellow commuters</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-status-green mt-0.5" strokeWidth={2} />
                    <span>Report issues promptly and clearly</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-status-green mt-0.5" strokeWidth={2} />
                    <span>Help build a positive community</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Quick Report Modal */}
      <QuickReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Train" size={24} className="text-primary" strokeWidth={2} />
              <span className="text-lg font-semibold text-foreground">TrainTracker Community</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building better transit experiences together since {new Date()?.getFullYear()}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Privacy Policy</button>
              <button className="hover:text-foreground transition-colors">Community Guidelines</button>
              <button className="hover:text-foreground transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityNetwork;