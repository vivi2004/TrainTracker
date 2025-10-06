import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommuterGroups = () => {
  const [selectedCategory, setSelectedCategory] = useState('popular');

  const groupCategories = [
    { value: 'popular', label: 'Popular', icon: 'TrendingUp' },
    { value: 'routes', label: 'By Route', icon: 'Route' },
    { value: 'stations', label: 'By Station', icon: 'MapPin' },
    { value: 'interests', label: 'Interests', icon: 'Heart' }
  ];

  const commuterGroups = [
    {
      id: 1,
      name: "Blue Line Morning Commuters",
      description: "Share tips and updates for the 7-9 AM Blue Line rush. Best car positions, timing strategies, and alternative routes.",
      category: "routes",
      route: "Blue Line",
      members: 1247,
      posts: 89,
      lastActivity: "2 minutes ago",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop",
      isJoined: true,
      moderators: [
        { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" }
      ],
      tags: ["rush-hour", "tips", "delays"]
    },
    {
      id: 2,
      name: "Downtown Central Hub",
      description: "Everything about Downtown Central station - transfers, amenities, accessibility, and local recommendations.",
      category: "stations",
      station: "Downtown Central",
      members: 892,
      posts: 156,
      lastActivity: "15 minutes ago",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop",
      isJoined: false,
      moderators: [
        { name: "Mike Rodriguez", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" }
      ],
      tags: ["transfers", "amenities", "accessibility"]
    },
    {
      id: 3,
      name: "Transit Photography Club",
      description: "Share beautiful photos of trains, stations, and urban transit scenes. Weekly photo challenges and tips.",
      category: "interests",
      members: 634,
      posts: 234,
      lastActivity: "1 hour ago",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop",
      isJoined: true,
      moderators: [
        { name: "Alex Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" }
      ],
      tags: ["photography", "art", "weekly-challenge"]
    },
    {
      id: 4,
      name: "Green Line Express Riders",
      description: "For commuters who rely on Green Line express services. Share schedule updates, crowding reports, and efficiency tips.",
      category: "routes",
      route: "Green Line",
      members: 756,
      posts: 67,
      lastActivity: "3 hours ago",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop",
      isJoined: false,
      moderators: [
        { name: "Jessica Park", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" }
      ],
      tags: ["express", "schedule", "efficiency"]
    },
    {
      id: 5,
      name: "Accessibility Advocates",
      description: "Supporting accessible transit for everyone. Share elevator status, accessibility reviews, and advocacy updates.",
      category: "interests",
      members: 423,
      posts: 78,
      lastActivity: "5 hours ago",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop",
      isJoined: true,
      moderators: [
        { name: "David Chen", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" }
      ],
      tags: ["accessibility", "advocacy", "elevators"]
    },
    {
      id: 6,
      name: "Night Shift Commuters",
      description: "For those who travel during off-peak hours. Safety tips, schedule updates, and late-night alternatives.",
      category: "popular",
      members: 345,
      posts: 45,
      lastActivity: "8 hours ago",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop",
      isJoined: false,
      moderators: [
        { name: "Maria Santos", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face" }
      ],
      tags: ["night-shift", "safety", "off-peak"]
    }
  ];

  const getFilteredGroups = () => {
    if (selectedCategory === 'popular') {
      return commuterGroups?.sort((a, b) => b?.members - a?.members)?.slice(0, 4);
    }
    return commuterGroups?.filter(group => group?.category === selectedCategory);
  };

  const handleJoinGroup = (groupId) => {
    // Simulate joining/leaving group
    console.log(`Toggle join status for group ${groupId}`);
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {groupCategories?.map((category) => (
          <button
            key={category?.value}
            onClick={() => setSelectedCategory(category?.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category?.value
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
            }`}
          >
            <Icon name={category?.icon} size={16} strokeWidth={2} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getFilteredGroups()?.map((group) => (
          <div
            key={group?.id}
            className="bg-card rounded-lg border border-border overflow-hidden transit-elevation hover:shadow-lg transition-all duration-200"
          >
            {/* Group Image */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={group?.image}
                alt={group?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold text-lg leading-tight">{group?.name}</h3>
              </div>
            </div>

            {/* Group Content */}
            <div className="p-4 space-y-4">
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {group?.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Users" size={14} strokeWidth={2} />
                    <span>{group?.members?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="MessageSquare" size={14} strokeWidth={2} />
                    <span>{group?.posts}</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{group?.lastActivity}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {group?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Moderators */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Moderated by:</span>
                  <div className="flex -space-x-1">
                    {group?.moderators?.map((mod, index) => (
                      <Image
                        key={index}
                        src={mod?.avatar}
                        alt={mod?.name}
                        className="w-6 h-6 rounded-full border-2 border-card object-cover"
                      />
                    ))}
                  </div>
                </div>
                
                {/* Join Button */}
                <Button
                  variant={group?.isJoined ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleJoinGroup(group?.id)}
                  className="text-xs"
                >
                  {group?.isJoined ? (
                    <>
                      <Icon name="Check" size={14} strokeWidth={2} className="mr-1" />
                      Joined
                    </>
                  ) : (
                    <>
                      <Icon name="Plus" size={14} strokeWidth={2} className="mr-1" />
                      Join
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Create Group CTA */}
      <div className="text-center py-8 border-t border-border">
        <div className="max-w-md mx-auto space-y-3">
          <Icon name="Users" size={32} className="mx-auto text-muted-foreground" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-foreground">Start Your Own Group</h3>
          <p className="text-sm text-muted-foreground">
            Create a community around your route, station, or transit interest
          </p>
          <Button variant="outline" className="mt-4">
            <Icon name="Plus" size={16} strokeWidth={2} className="mr-2" />
            Create Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommuterGroups;