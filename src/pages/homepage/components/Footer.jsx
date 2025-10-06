import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Live Tracking', href: '/live-tracking-dashboard' },
        { name: 'Route Planner', href: '/route-planner' },
        { name: 'Community Network', href: '/community-network' },
        { name: 'Analytics Dashboard', href: '/predictive-analytics-dashboard' },
        { name: 'Mobile Apps', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'API Documentation', href: '#' },
        { name: 'System Status', href: '#' },
        { name: 'Transit Authorities', href: '/transit-authority-integration' },
        { name: 'Accessibility', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
        { name: 'Data Protection', href: '#' },
        { name: 'Compliance', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
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
            
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Transforming daily commutes with real-time tracking, predictive analytics, and community-driven insights. Never wonder where your train is again.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transit-transition"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="space-y-4">
              <h3 className="text-sm font-inter font-bold text-foreground uppercase tracking-wider">
                {section?.title}
              </h3>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <a
                      href={link?.href}
                      className="text-sm text-muted-foreground hover:text-foreground transit-transition"
                    >
                      {link?.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-muted rounded-xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-inter font-bold text-foreground">
              Stay Updated with Transit Intelligence
            </h3>
            <p className="text-muted-foreground">
              Get weekly insights, new feature announcements, and commuter tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-inter font-medium hover:bg-primary/90 transit-transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>© {currentYear} TrainTracker. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-foreground transit-transition">Privacy</a>
              <a href="#" className="hover:text-foreground transit-transition">Terms</a>
              <a href="#" className="hover:text-foreground transit-transition">Cookies</a>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-status-green rounded-full status-breathing"></div>
            <span className="text-sm text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;