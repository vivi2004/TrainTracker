import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommuterSpotlight = () => {
  const spotlightStories = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        badge: "Route Optimizer",
        joinDate: "March 2024"
      },
      title: "How I Cut My Commute Time by 25 Minutes",
      story: `After joining TrainTracker's community, I discovered that switching from the Blue Line to a combination of Green Line + Red Line transfer actually saves me significant time during rush hour.\n\nThe community helped me identify that Blue Line consistently has 15-20 minute delays between 8-9 AM, while the alternative route maintains better reliability. I also learned about the optimal car positioning for quick transfers at Metro Plaza.\n\nNow I arrive at work 25 minutes earlier and with much less stress. The predictive analytics helped me plan, but the community insights made all the difference.`,
      metrics: {
        timeSaved: "25 min daily",
        stressReduction: "60%",
        helpfulTips: 47
      },
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=600&h=300&fit=crop",
      likes: 234,
      comments: 45,
      featured: true
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        badge: "Community Helper",
        joinDate: "January 2024"
      },
      title: "Building the Downtown Central Accessibility Guide",
      story: `As someone who uses a wheelchair, I noticed that accessibility information was scattered and often outdated. I started documenting elevator status, accessible routes, and platform conditions at Downtown Central.\n\nThe community rallied around this initiative, with dozens of commuters contributing real-time updates about elevator outages, construction barriers, and alternative accessible paths.\n\nWhat started as personal documentation became a comprehensive accessibility resource that helps hundreds of commuters with mobility needs navigate the system confidently.`,
      metrics: {
        guidesCreated: 12,
        usersHelped: 340,
        accessibilityReports: 89
      },
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=600&h=300&fit=crop",
      likes: 189,
      comments: 67,
      featured: false
    },
    {
      id: 3,
      user: {
        name: "Jessica Park",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        badge: "Data Contributor",
        joinDate: "February 2024"
      },
      title: "Predicting Rush Hour Patterns with Community Data",
      story: `I'm a data analyst by profession, and I became fascinated by the patterns in our community's delay reports. I started correlating weather data, special events, and historical delays to create better predictions.\n\nBy sharing my analysis with the community, we've collectively improved our ability to anticipate disruptions. My weather-based delay predictions are now 85% accurate, helping thousands of commuters plan better.\n\nThe collaboration between community insights and data analysis has created something more powerful than either could achieve alone.`,
      metrics: {
        predictionAccuracy: "85%",
        dataPoints: 2340,
        analysisShared: 23
      },
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=600&h=300&fit=crop",
      likes: 156,
      comments: 34,
      featured: false
    }
  ];

  const achievements = [
    { icon: "Clock", label: "Time Saver", description: "Helped others save 1000+ hours" },
    { icon: "Users", label: "Community Builder", description: "Connected 500+ commuters" },
    { icon: "TrendingUp", label: "Data Contributor", description: "Shared 100+ insights" },
    { icon: "Heart", label: "Helper", description: "Received 50+ thanks" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Star" size={24} className="text-amber-500" strokeWidth={2} />
          <h2 className="text-2xl font-bold text-foreground">Commuter Spotlight</h2>
          <Icon name="Star" size={24} className="text-amber-500" strokeWidth={2} />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Celebrating community members who make transit better for everyone through their insights, 
          contributions, and collaborative spirit.
        </p>
      </div>
      {/* Featured Story */}
      {spotlightStories?.filter(story => story?.featured)?.map((story) => (
        <div key={story?.id} className="bg-gradient-to-r from-primary/5 to-safety-orange/5 rounded-lg border border-primary/20 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Award" size={20} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-primary">Featured Story</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-start space-x-4">
                <Image
                  src={story?.user?.avatar}
                  alt={story?.user?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground">{story?.user?.name}</h3>
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {story?.user?.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Member since {story?.user?.joinDate}</p>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-foreground">{story?.title}</h4>
              
              <div className="prose prose-sm max-w-none">
                {story?.story?.split('\n\n')?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="flex items-center space-x-6 pt-3 border-t border-border">
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Heart" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">{story?.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">{story?.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Share" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={story?.image}
                  alt="Success story"
                  className="w-full h-32 object-cover"
                />
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <h5 className="font-semibold text-foreground mb-3">Impact Metrics</h5>
                <div className="space-y-2">
                  {Object.entries(story?.metrics)?.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </span>
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Other Stories */}
      <div className="grid md:grid-cols-2 gap-6">
        {spotlightStories?.filter(story => !story?.featured)?.map((story) => (
          <div key={story?.id} className="bg-card rounded-lg border border-border p-6 transit-elevation hover:shadow-lg transition-all duration-200">
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={story?.user?.avatar}
                alt={story?.user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{story?.user?.name}</h4>
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                    {story?.user?.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Member since {story?.user?.joinDate}</p>
              </div>
            </div>
            
            <h5 className="text-lg font-semibold text-foreground mb-3">{story?.title}</h5>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">
              {story?.story?.split('\n\n')?.[0]}
            </p>
            
            <div className="rounded-lg overflow-hidden mb-4">
              <Image
                src={story?.image}
                alt="Story image"
                className="w-full h-24 object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Heart" size={16} strokeWidth={2} />
                  <span className="text-xs font-medium">{story?.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={16} strokeWidth={2} />
                  <span className="text-xs font-medium">{story?.comments}</span>
                </button>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Achievement Badges */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Community Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements?.map((achievement, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name={achievement?.icon} size={24} className="text-primary" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{achievement?.label}</h4>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Nominate CTA */}
      <div className="text-center py-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Know Someone Amazing?</h3>
        <p className="text-muted-foreground mb-4">
          Nominate a community member who's made a positive impact on your transit experience
        </p>
        <Button variant="outline">
          <Icon name="Award" size={16} strokeWidth={2} className="mr-2" />
          Nominate a Commuter
        </Button>
      </div>
    </div>
  );
};

export default CommuterSpotlight;