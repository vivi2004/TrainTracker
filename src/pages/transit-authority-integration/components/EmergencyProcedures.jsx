import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyProcedures = ({ emergencyInfo }) => {
  const [activeTab, setActiveTab] = useState('procedures');
  const [expandedSection, setExpandedSection] = useState(null);

  const emergencyTabs = [
    { key: 'procedures', label: 'Emergency Procedures', icon: 'AlertTriangle' },
    { key: 'contacts', label: 'Emergency Contacts', icon: 'Phone' },
    { key: 'evacuation', label: 'Evacuation Routes', icon: 'Navigation' },
    { key: 'medical', label: 'Medical Assistance', icon: 'Heart' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-l-disruption-red bg-red-50';
      case 'high':
        return 'border-l-delay-amber bg-amber-50';
      case 'medium':
        return 'border-l-transit-blue bg-blue-50';
      default:
        return 'border-l-muted bg-muted/50';
    }
  };

  const renderProcedures = () => (
    <div className="space-y-4">
      {emergencyInfo?.procedures?.map((procedure, index) => (
        <div key={index} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(procedure?.priority)}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Icon name={procedure?.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-inter font-semibold text-foreground">
                  {procedure?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {procedure?.scenario}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              procedure?.priority === 'critical' ? 'bg-disruption-red text-white' :
              procedure?.priority === 'high'? 'bg-delay-amber text-white' : 'bg-primary text-primary-foreground'
            }`}>
              {procedure?.priority}
            </span>
          </div>
          
          <div className="space-y-3">
            {procedure?.steps?.map((step, stepIndex) => (
              <div key={stepIndex} className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                  {stepIndex + 1}
                </div>
                <p className="text-sm text-foreground leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {procedure?.importantNote && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary font-medium">{procedure?.importantNote}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderContacts = () => (
    <div className="grid gap-4">
      {emergencyInfo?.contacts?.map((contact, index) => (
        <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transit-transition">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={contact?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-inter font-semibold text-foreground">
                  {contact?.department}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {contact?.description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{contact?.number}</div>
              <div className="text-xs text-muted-foreground">{contact?.availability}</div>
            </div>
          </div>
          
          {contact?.additionalInfo && (
            <div className="pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">{contact?.additionalInfo}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderEvacuation = () => (
    <div className="space-y-6">
      {emergencyInfo?.evacuationRoutes?.map((route, index) => (
        <div key={index} className="p-4 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-status-green/10 rounded-lg">
                <Icon name="Navigation" size={20} className="text-status-green" />
              </div>
              <div>
                <h3 className="font-inter font-semibold text-foreground">
                  {route?.station}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {route?.platforms?.join(', ')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setExpandedSection(expandedSection === index ? null : index)}
              className="p-2 rounded-lg hover:bg-muted transit-transition"
            >
              <Icon 
                name={expandedSection === index ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground" 
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Capacity:</span>
              <span className="text-sm font-medium text-foreground">{route?.capacity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Est. Time:</span>
              <span className="text-sm font-medium text-foreground">{route?.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Accessibility" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Accessible:</span>
              <span className={`text-sm font-medium ${route?.accessible ? 'text-status-green' : 'text-disruption-red'}`}>
                {route?.accessible ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {expandedSection === index && (
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-3">Evacuation Steps:</h4>
              <div className="space-y-2">
                {route?.steps?.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-status-green text-white rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                      {stepIndex + 1}
                    </div>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMedical = () => (
    <div className="space-y-4">
      {emergencyInfo?.medicalAssistance?.map((service, index) => (
        <div key={index} className="p-4 rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-lg">
              <Icon name="Heart" size={20} className="text-disruption-red" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-foreground">
                {service?.type}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service?.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Available Locations:</h4>
              <div className="space-y-1">
                {service?.locations?.map((location, locationIndex) => (
                  <div key={locationIndex} className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{location}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Contact Information:</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-primary font-medium">{service?.contact}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{service?.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'procedures':
        return renderProcedures();
      case 'contacts':
        return renderContacts();
      case 'evacuation':
        return renderEvacuation();
      case 'medical':
        return renderMedical();
      default:
        return renderProcedures();
    }
  };

  return (
    <div className="bg-card rounded-lg border transit-elevation">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-disruption-red/10 rounded-lg">
            <Icon name="Shield" size={20} className="text-disruption-red" />
          </div>
          <div>
            <h2 className="text-lg font-inter font-semibold text-foreground">
              Emergency Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Official emergency procedures and contact information
            </p>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="px-6 pt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {emergencyTabs?.map((tab) => (
            <button
              key={tab?.key}
              onClick={() => setActiveTab(tab?.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transit-transition ${
                activeTab === tab?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="px-6 pb-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EmergencyProcedures;