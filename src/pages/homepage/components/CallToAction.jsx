import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToAction = () => {
  const features = [
    {
      icon: 'Smartphone',
      title: 'Mobile App',
      description: 'Download our iOS and Android apps for on-the-go tracking'
    },
    {
      icon: 'Bell',
      title: 'Smart Alerts',
      description: 'Get personalized notifications for your regular routes'
    },
    {
      icon: 'Users',
      title: 'Community',
      description: 'Join thousands of commuters sharing real-time updates'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics',
      description: 'Access detailed insights about your travel patterns'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-bold text-white mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of smart commuters who never miss their train. Start tracking, predicting, and optimizing your journey today.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Icon name={feature.icon} size={28} color="white" strokeWidth={2} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-inter font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="xl"
              iconName="Smartphone"
              iconPosition="left"
              className="bg-safety-orange hover:bg-safety-orange/90 text-white px-8 py-4 text-lg font-semibold shadow-xl"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="xl"
              iconName="Play"
              iconPosition="left"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/70 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Setup in 2 Minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>12,000+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} />
              <span>4.9/5 Rating</span>
            </div>
          </div>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 hover:bg-black/30 transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={24} color="white" />
                <div className="text-left">
                  <div className="text-xs text-white/70">Download on the</div>
                  <div className="text-sm font-semibold text-white">App Store</div>
                </div>
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 hover:bg-black/30 transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={24} color="white" />
                <div className="text-left">
                  <div className="text-xs text-white/70">Get it on</div>
                  <div className="text-sm font-semibold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-safety-orange/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse"></div>
    </section>
  );
};

export default CallToAction;