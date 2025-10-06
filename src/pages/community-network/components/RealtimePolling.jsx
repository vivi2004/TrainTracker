import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealtimePolling = () => {
  const [activePolls, setActivePolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState(new Set());

  const pollsData = [
    {
      id: 1,
      question: "How would you rate Blue Line service today?",
      type: "rating",
      route: "Blue Line",
      createdBy: "Transit Authority",
      timeRemaining: 3600, // seconds
      totalVotes: 1247,
      options: [
        { id: 'excellent', label: 'Excellent', votes: 89, emoji: '😊' },
        { id: 'good', label: 'Good', votes: 456, emoji: '🙂' },
        { id: 'fair', label: 'Fair', votes: 523, emoji: '😐' },
        { id: 'poor', label: 'Poor', votes: 179, emoji: '😞' }
      ],
      urgent: false
    },
    {
      id: 2,
      question: "Are you experiencing delays on Green Line right now?",
      type: "yesno",
      route: "Green Line",
      createdBy: "Community",
      timeRemaining: 1800,
      totalVotes: 234,
      options: [
        { id: 'yes', label: 'Yes, significant delays', votes: 156, emoji: '🚫' },
        { id: 'minor', label: 'Minor delays (5-10 min)', votes: 45, emoji: '⏰' },
        { id: 'no', label: 'No delays', votes: 33, emoji: '✅' }
      ],
      urgent: true
    },
    {
      id: 3,
      question: "Which alternative route worked best during today\'s Blue Line disruption?",
      type: "choice",
      route: "System Wide",
      createdBy: "Sarah Chen",
      timeRemaining: 7200,
      totalVotes: 89,
      options: [
        { id: 'red-transfer', label: 'Red Line + Bus Transfer', votes: 34, emoji: '🚌' },
        { id: 'green-walk', label: 'Green Line + 10min walk', votes: 28, emoji: '🚶' },
        { id: 'uber', label: 'Rideshare/Taxi', votes: 15, emoji: '🚗' },
        { id: 'stayed', label: 'Waited for Blue Line', votes: 12, emoji: '⏳' }
      ],
      urgent: false
    }
  ];

  useEffect(() => {
    setActivePolls(pollsData);
  }, []);

  const handleVote = (pollId, optionId) => {
    if (votedPolls?.has(pollId)) return;

    setActivePolls(prev => prev?.map(poll => {
      if (poll?.id === pollId) {
        return {
          ...poll,
          totalVotes: poll?.totalVotes + 1,
          options: poll?.options?.map(option => 
            option?.id === optionId 
              ? { ...option, votes: option?.votes + 1 }
              : option
          )
        };
      }
      return poll;
    }));

    setVotedPolls(prev => new Set([...prev, pollId]));
  };

  const formatTimeRemaining = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const getVotePercentage = (votes, total) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const getPollTypeIcon = (type) => {
    switch (type) {
      case 'rating': return 'Star';
      case 'yesno': return 'HelpCircle';
      case 'choice': return 'List';
      default: return 'MessageSquare';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Live Community Polls</h2>
          <p className="text-sm text-muted-foreground">
            Real-time sentiment and feedback from fellow commuters
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} strokeWidth={2} className="mr-2" />
          Create Poll
        </Button>
      </div>
      {/* Active Polls */}
      <div className="space-y-4">
        {activePolls?.map((poll) => {
          const hasVoted = votedPolls?.has(poll?.id);
          
          return (
            <div
              key={poll?.id}
              className={`bg-card rounded-lg border p-6 transit-elevation ${
                poll?.urgent ? 'border-disruption-red/30 bg-red-50/30' : 'border-border'
              }`}
            >
              {/* Poll Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${poll?.urgent ? 'bg-disruption-red/10' : 'bg-primary/10'}`}>
                    <Icon 
                      name={getPollTypeIcon(poll?.type)} 
                      size={20} 
                      className={poll?.urgent ? 'text-disruption-red' : 'text-primary'} 
                      strokeWidth={2} 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {poll?.urgent && (
                        <span className="px-2 py-0.5 bg-disruption-red text-white text-xs rounded-full font-medium">
                          URGENT
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                        {poll?.route}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{poll?.question}</h3>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                      <span>by {poll?.createdBy}</span>
                      <span>•</span>
                      <span>{poll?.totalVotes} votes</span>
                      <span>•</span>
                      <span>{formatTimeRemaining(poll?.timeRemaining)}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Poll Options */}
              <div className="space-y-3">
                {poll?.options?.map((option) => {
                  const percentage = getVotePercentage(option?.votes, poll?.totalVotes);
                  const isSelected = hasVoted;
                  
                  return (
                    <button
                      key={option?.id}
                      onClick={() => handleVote(poll?.id, option?.id)}
                      disabled={hasVoted}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                        hasVoted
                          ? 'bg-muted/50 cursor-not-allowed' :'bg-card hover:bg-muted/50 hover:border-primary/30 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{option?.emoji}</span>
                          <span className="font-medium text-foreground">{option?.label}</span>
                        </div>
                        {hasVoted && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">{option?.votes}</span>
                            <span className="text-sm font-medium text-foreground">{percentage}%</span>
                          </div>
                        )}
                      </div>
                      {hasVoted && (
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Poll Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="MessageCircle" size={16} strokeWidth={2} />
                    <span className="text-sm">Discuss</span>
                  </button>
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="Share" size={16} strokeWidth={2} />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
                
                {hasVoted && (
                  <div className="flex items-center space-x-2 text-sm text-status-green">
                    <Icon name="Check" size={16} strokeWidth={2} />
                    <span>Vote recorded</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Poll Statistics */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Community Engagement</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1,570</div>
            <div className="text-sm text-muted-foreground">Total Votes Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-status-green">3</div>
            <div className="text-sm text-muted-foreground">Active Polls</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-safety-orange">89%</div>
            <div className="text-sm text-muted-foreground">Participation Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-delay-amber">12</div>
            <div className="text-sm text-muted-foreground">Polls This Week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimePolling;