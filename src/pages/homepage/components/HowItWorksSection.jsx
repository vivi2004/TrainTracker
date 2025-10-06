import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: 'Activity',
      title: 'Track',
      description: 'Real-time location tracking of all trains in your area with precise arrival predictions',
      details: 'Our advanced GPS and API integration provides accurate train positions updated every 30 seconds',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary'
    },
    {
      icon: 'TrendingUp',
      title: 'Predict',
      description: 'AI-powered delay predictions based on historical data and current conditions',
      details: 'Machine learning algorithms analyze patterns to predict delays up to 30 minutes in advance',
      color: 'text-safety-orange',
      bgColor: 'bg-safety-orange/10',
      borderColor: 'border-safety-orange'
    },
    {
      icon: 'Target',
      title: 'Optimize',
      description: 'Smart route suggestions and alternative options for the most efficient journey',
      details: 'Get personalized recommendations based on your travel patterns and real-time conditions',
      color: 'text-status-green',
      bgColor: 'bg-status-green/10',
      borderColor: 'border-status-green'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-inter font-bold text-foreground mb-6">
            How TrainTracker Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From uncertainty to confidence in three simple steps. Experience the future of commuting.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 grid grid-cols-3 gap-8">
              {steps?.map((step, index) => (
                <div
                  key={index}
                  className={`text-center transit-transition duration-500 ${
                    activeStep === index ? 'scale-105' : 'scale-100'
                  }`}
                >
                  <div className="relative mb-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${step?.borderColor} ${step?.bgColor} bg-card shadow-lg transit-transition duration-500 ${
                      activeStep === index ? 'shadow-xl' : ''
                    }`}>
                      <Icon name={step?.icon} size={36} className={step?.color} strokeWidth={2.5} />
                    </div>
                    {activeStep === index && (
                      <div className="absolute inset-0 rounded-full border-4 border-current opacity-30 animate-ping"></div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-inter font-bold ${step?.color}`}>
                      {step?.title}
                    </h3>
                    <p className="text-lg text-foreground font-medium">
                      {step?.description}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step?.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-8">
          {steps?.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-6 p-6 rounded-xl border-2 transit-transition duration-300 ${
                activeStep === index 
                  ? `${step?.borderColor} ${step?.bgColor}` 
                  : 'border-border bg-card'
              }`}
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-full border-2 ${step?.borderColor} ${step?.bgColor} flex items-center justify-center`}>
                <Icon name={step?.icon} size={28} className={step?.color} strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className={`text-xl font-inter font-bold ${step?.color}`}>
                  {step?.title}
                </h3>
                <p className="text-foreground font-medium">
                  {step?.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {step?.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {steps?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transit-transition duration-300 ${
                activeStep === index ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;