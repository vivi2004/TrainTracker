import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StatsCounter from './components/StatsCounter';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import CommunityInsights from './components/CommunityInsights';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const Homepage = () => {
  const handleRouteSearch = (searchData) => {
    console.log('Route search:', searchData);
    // Navigate to route planner with search data
    window.location.href = `/route-planner?from=${encodeURIComponent(searchData?.from)}&to=${encodeURIComponent(searchData?.to)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section with Live Map and Route Search */}
        <HeroSection onRouteSearch={handleRouteSearch} />
        
        {/* Real-time Statistics Counter */}
        <StatsCounter />
        
        {/* How It Works - Track, Predict, Optimize */}
        <HowItWorksSection />
        
        {/* Testimonials Carousel */}
        <TestimonialsCarousel />
        
        {/* Community Insights Section */}
        <CommunityInsights />
        
        {/* Call to Action */}
        <CallToAction />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;