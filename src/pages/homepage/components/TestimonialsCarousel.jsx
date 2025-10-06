import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Manager",
      location: "Downtown to Financial District",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `TrainTracker saved me 45 minutes every day by predicting delays on my usual route. I now take the 7:15 train instead of the 7:30, and I'm never late for meetings anymore.`,
      timeSaved: "45 min/day",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Software Developer",
      location: "Suburbs to Tech Hub",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The community updates feature is incredible. Other commuters warned me about a signal failure before it was officially announced. I switched routes and got to work on time while others were stuck.`,
      timeSaved: "30 min/day",
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Teacher",
      location: "Residential to University District",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `As someone new to the city, TrainTracker gave me confidence to navigate the transit system. The predictive analytics helped me plan my commute perfectly from day one.`,
      timeSaved: "20 min/day",
      rating: 5,
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "Consultant",
      location: "Multiple Routes Daily",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `I travel to different client locations daily. TrainTracker's route optimization suggests the best connections and warns me about delays across the entire network. It's like having a personal transit assistant.`,
      timeSaved: "60 min/day",
      rating: 5,
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-bold text-foreground mb-6">
            Real Stories from Real Commuters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how TrainTracker transforms daily commutes and reduces travel stress
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl info-layer">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="relative inline-block">
                  <Image
                    src={currentData?.avatar}
                    alt={currentData?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  {currentData?.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-status-green rounded-full flex items-center justify-center border-2 border-card">
                      <Icon name="CheckCircle" size={16} color="white" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <h4 className="text-lg font-inter font-bold text-foreground">
                    {currentData?.name}
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">
                    {currentData?.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {currentData?.location}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 space-y-6">
                <div className="relative">
                  <Icon name="Quote" size={32} className="text-primary/20 absolute -top-2 -left-2" />
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed font-medium pl-8">
                    {currentData?.content}
                  </blockquote>
                </div>

                {/* Rating and Stats */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-1">
                    {[...Array(currentData?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="text-safety-orange fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-status-green/10 px-4 py-2 rounded-full">
                      <span className="text-sm font-inter font-bold text-status-green">
                        Saves {currentData?.timeSaved}
                      </span>
                    </div>
                    {currentData?.verified && (
                      <div className="flex items-center space-x-1 text-status-green">
                        <Icon name="Shield" size={16} />
                        <span className="text-xs font-medium">Verified User</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transit-transition shadow-md"
            >
              <Icon name="ChevronLeft" size={20} strokeWidth={2.5} />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transit-transition ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transit-transition shadow-md"
            >
              <Icon name="ChevronRight" size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-card px-6 py-3 rounded-full shadow-md">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="text-sm font-inter font-medium text-muted-foreground">
              Join 12,000+ satisfied commuters
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;