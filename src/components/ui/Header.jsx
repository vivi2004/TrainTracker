import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/live-tracking-dashboard', icon: 'Activity' },
    { name: 'Route Planner', path: '/route-planner', icon: 'Route' },
    { name: 'Community', path: '/community-network', icon: 'Users' },
    { name: 'Analytics', path: '/predictive-analytics-dashboard', icon: 'BarChart3' },
  ];

  const secondaryItems = [
    { name: 'Transit Authority', path: '/transit-authority-integration', icon: 'Building2' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border transit-elevation">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Train" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-inter font-bold text-primary tracking-tight">
              TrainTracker
            </h1>
            <span className="text-xs font-inter font-medium text-muted-foreground -mt-1">
              Intelligent Transit
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-inter font-medium transition-all duration-250 ease-out ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} strokeWidth={2} />
              <span>{item?.name}</span>
            </button>
          ))}
          
          {/* More Menu */}
          <div className="relative ml-2">
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-inter font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-250 ease-out"
              onClick={() => handleNavigation('/transit-authority-integration')}
            >
              <Icon name="MoreHorizontal" size={18} strokeWidth={2} />
              <span>More</span>
            </button>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Real-time Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-status-green/10 rounded-full">
            <div className="w-2 h-2 bg-status-green rounded-full status-breathing"></div>
            <span className="text-xs font-inter font-medium text-status-green">Live</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} strokeWidth={2} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-accent-foreground">3</span>
            </span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Icon name="User" size={20} strokeWidth={2} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} strokeWidth={2} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-inter font-medium transition-all duration-250 ease-out ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} strokeWidth={2} />
                <span>{item?.name}</span>
              </button>
            ))}
            
            {secondaryItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-inter font-medium transition-all duration-250 ease-out ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} strokeWidth={2} />
                <span>{item?.name}</span>
              </button>
            ))}

            {/* Mobile Status Indicator */}
            <div className="flex items-center justify-center space-x-2 px-3 py-2 mt-4 bg-status-green/10 rounded-lg">
              <div className="w-2 h-2 bg-status-green rounded-full status-breathing"></div>
              <span className="text-sm font-inter font-medium text-status-green">System Online</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;