import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const feedPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        badge: "verified",
        reputation: 4.8
      },
      timestamp: new Date(Date.now() - 300000),
      route: "Blue Line",
      station: "Downtown Central",
      type: "delay",
      severity: "moderate",
      content: "15-minute delay on Blue Line due to signal issues at Downtown Central. Train 4B is currently held at Union Station. Alternative: Red Line running normally.",
      likes: 23,
      comments: 8,
      verified: true,
      location: { lat: 40.7128, lng: -74.0060 },
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        badge: "contributor",
        reputation: 4.2
      },
      timestamp: new Date(Date.now() - 600000),
      route: "Green Line",
      station: "Metro Plaza",
      type: "tip",
      severity: "info",
      content: "Pro tip: Car 3 on Green Line trains has the best AC and least crowded during rush hour. Perfect spot for the morning commute!",
      likes: 45,
      comments: 12,
      verified: false
    },
    {
      id: 3,
      user: {
        name: "Transit Authority",
        avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
        badge: "official",
        reputation: 5.0
      },
      timestamp: new Date(Date.now() - 900000),
      route: "System Wide",
      station: "All Stations",
      type: "announcement",
      severity: "high",
      content: "Scheduled maintenance on Red Line this weekend (Aug 14-15). Free shuttle buses will operate between affected stations. Plan extra 20 minutes for your journey.",
      likes: 156,
      comments: 34,
      verified: true,
      pinned: true
    },
    {
      id: 4,
      user: {
        name: "Jessica Park",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        badge: "regular",
        reputation: 3.9
      },
      timestamp: new Date(Date.now() - 1200000),
      route: "Yellow Line",
      station: "Tech District",
      type: "update",
      severity: "low",
      content: "Yellow Line back to normal schedule. Earlier signal problems have been resolved. Thanks to everyone who shared alternative routes!",
      likes: 18,
      comments: 5,
      verified: false
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Updates', icon: 'Globe' },
    { value: 'delay', label: 'Delays', icon: 'Clock' },
    { value: 'tip', label: 'Tips', icon: 'Lightbulb' },
    { value: 'announcement', label: 'Official', icon: 'Megaphone' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-disruption-red bg-red-50 border-red-200';
      case 'moderate': return 'text-delay-amber bg-amber-50 border-amber-200';
      case 'low': return 'text-status-green bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'verified': return 'bg-primary text-primary-foreground';
      case 'official': return 'bg-status-green text-white';
      case 'contributor': return 'bg-safety-orange text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const minutes = Math.floor((Date.now() - timestamp?.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filteredPosts = selectedFilter === 'all' 
    ? feedPosts 
    : feedPosts?.filter(post => post?.type === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedFilter(option?.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedFilter === option?.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
            }`}
          >
            <Icon name={option?.icon} size={16} strokeWidth={2} />
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Feed Posts */}
      <div className="space-y-4">
        {filteredPosts?.map((post) => (
          <div
            key={post?.id}
            className={`bg-card rounded-lg border border-border p-6 transit-elevation hover:shadow-lg transition-all duration-200 ${
              post?.pinned ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={post?.user?.avatar}
                    alt={post?.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {post?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={10} color="white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{post?.user?.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeStyle(post?.user?.badge)}`}>
                      {post?.user?.badge}
                    </span>
                    {post?.pinned && (
                      <Icon name="Pin" size={14} className="text-primary" strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{post?.route}</span>
                    <span>•</span>
                    <span>{post?.station}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(post?.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(post?.severity)}`}>
                {post?.severity}
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-foreground leading-relaxed">{post?.content}</p>
              {post?.image && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <Image
                    src={post?.image}
                    alt="Post attachment"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Heart" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">{post?.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">{post?.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Share" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
              {post?.user?.reputation && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Star" size={14} className="text-amber-500" strokeWidth={2} />
                  <span>{post?.user?.reputation}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center pt-4">
        <Button variant="outline" className="px-8">
          Load More Updates
        </Button>
      </div>
    </div>
  );
};

export default CommunityFeed;