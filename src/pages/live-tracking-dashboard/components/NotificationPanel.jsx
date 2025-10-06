import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ isOpen, onClose, notifications, onMarkAsRead, onClearAll }) => {
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    return notification?.type === filter;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'delay': return 'Clock';
      case 'disruption': return 'AlertTriangle';
      case 'update': return 'Info';
      case 'community': return 'MessageCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'delay': return 'text-delay-amber';
      case 'disruption': return 'text-disruption-red';
      case 'update': return 'text-primary';
      case 'community': return 'text-status-green';
      default: return 'text-muted-foreground';
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'delay': return 'bg-delay-amber/10';
      case 'disruption': return 'bg-disruption-red/10';
      case 'update': return 'bg-primary/10';
      case 'community': return 'bg-status-green/10';
      default: return 'bg-muted/10';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-card border-l border-border shadow-xl transform transition-transform duration-300 z-50 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-inter font-semibold text-foreground">Notifications</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Icon name="X" size={20} color="var(--color-muted-foreground)" />
        </button>
      </div>
      {/* Filter Tabs */}
      <div className="flex border-b border-border">
        {[
          { key: 'all', label: 'All', count: notifications?.length },
          { key: 'delay', label: 'Delays', count: notifications?.filter(n => n?.type === 'delay')?.length },
          { key: 'disruption', label: 'Alerts', count: notifications?.filter(n => n?.type === 'disruption')?.length },
          { key: 'community', label: 'Community', count: notifications?.filter(n => n?.type === 'community')?.length }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              filter === tab?.key
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label}
            {tab?.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Actions */}
      <div className="p-3 border-b border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            iconName="Trash2"
            iconPosition="left"
            className="flex-1"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead('all')}
            iconName="CheckCheck"
            iconPosition="left"
            className="flex-1"
          >
            Mark Read
          </Button>
        </div>
      </div>
      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Icon name="Bell" size={48} color="var(--color-muted-foreground)" strokeWidth={1} />
            <h3 className="mt-4 text-sm font-medium text-foreground">No notifications</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              You're all caught up! We'll notify you of any updates.
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                  notification?.isRead 
                    ? 'border-border bg-card' :'border-primary/20 bg-primary/5'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getNotificationBg(notification?.type)}`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={14} 
                      color={`var(--color-${notification?.type === 'delay' ? 'delay-amber' : notification?.type === 'disruption' ? 'disruption-red' : notification?.type === 'community' ? 'status-green' : 'primary'})`}
                      strokeWidth={2}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {notification?.title}
                      </h4>
                      {!notification?.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {notification?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification?.timestamp)}
                      </span>
                      
                      {notification?.route && (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {notification?.route}
                        </span>
                      )}
                    </div>
                    
                    {!notification?.isRead && (
                      <button
                        onClick={() => onMarkAsRead(notification?.id)}
                        className="mt-2 text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {notifications?.filter(n => !n?.isRead)?.length} unread
          </span>
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;