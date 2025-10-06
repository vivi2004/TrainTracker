import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const QuickReportModal = ({ isOpen, onClose }) => {
  const [reportData, setReportData] = useState({
    type: '',
    route: '',
    station: '',
    severity: '',
    description: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    { value: 'delay', label: 'Service Delay' },
    { value: 'disruption', label: 'Service Disruption' },
    { value: 'crowding', label: 'Overcrowding' },
    { value: 'maintenance', label: 'Maintenance Issue' },
    { value: 'safety', label: 'Safety Concern' },
    { value: 'tip', label: 'Helpful Tip' }
  ];

  const routes = [
    { value: 'blue', label: 'Blue Line' },
    { value: 'red', label: 'Red Line' },
    { value: 'green', label: 'Green Line' },
    { value: 'yellow', label: 'Yellow Line' },
    { value: 'orange', label: 'Orange Line' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor inconvenience' },
    { value: 'moderate', label: 'Moderate - Noticeable impact' },
    { value: 'high', label: 'High - Major disruption' },
    { value: 'critical', label: 'Critical - System-wide issue' }
  ];

  const stations = [
    { value: 'downtown-central', label: 'Downtown Central' },
    { value: 'union-station', label: 'Union Station' },
    { value: 'metro-plaza', label: 'Metro Plaza' },
    { value: 'tech-district', label: 'Tech District' },
    { value: 'university-ave', label: 'University Avenue' },
    { value: 'airport-terminal', label: 'Airport Terminal' }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setReportData({
      type: '',
      route: '',
      station: '',
      severity: '',
      description: '',
      image: null
    });
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setReportData(prev => ({ ...prev, image: file }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Quick Report</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} strokeWidth={2} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Report Type */}
          <Select
            label="Report Type"
            placeholder="Select report type"
            options={reportTypes}
            value={reportData?.type}
            onChange={(value) => setReportData(prev => ({ ...prev, type: value }))}
            required
          />

          {/* Route Selection */}
          <Select
            label="Transit Line"
            placeholder="Select transit line"
            options={routes}
            value={reportData?.route}
            onChange={(value) => setReportData(prev => ({ ...prev, route: value }))}
            required
          />

          {/* Station Selection */}
          <Select
            label="Station"
            placeholder="Select station"
            options={stations}
            value={reportData?.station}
            onChange={(value) => setReportData(prev => ({ ...prev, station: value }))}
            searchable
            required
          />

          {/* Severity Level */}
          <Select
            label="Severity Level"
            placeholder="Select severity"
            options={severityLevels}
            value={reportData?.severity}
            onChange={(value) => setReportData(prev => ({ ...prev, severity: value }))}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={reportData?.description}
              onChange={(e) => setReportData(prev => ({ ...prev, description: e?.target?.value }))}
              placeholder="Describe the situation in detail..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Add Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="Camera" size={24} className="text-muted-foreground" strokeWidth={2} />
                  <span className="text-sm text-muted-foreground">
                    {reportData?.image ? reportData?.image?.name : 'Click to add photo'}
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Quick Templates */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Quick Templates
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setReportData(prev => ({ 
                  ...prev, 
                  description: "Train is running approximately 10-15 minutes behind schedule due to signal delays." 
                }))}
                className="p-2 text-xs bg-muted hover:bg-muted/80 rounded-lg text-left transition-colors"
              >
                Signal Delay
              </button>
              <button
                type="button"
                onClick={() => setReportData(prev => ({ 
                  ...prev, 
                  description: "Platform is extremely crowded. Consider alternative routes or wait for next train." 
                }))}
                className="p-2 text-xs bg-muted hover:bg-muted/80 rounded-lg text-left transition-colors"
              >
                Overcrowding
              </button>
              <button
                type="button"
                onClick={() => setReportData(prev => ({ 
                  ...prev, 
                  description: "Service has resumed normal operations. Earlier delays have been resolved." 
                }))}
                className="p-2 text-xs bg-muted hover:bg-muted/80 rounded-lg text-left transition-colors"
              >
                Service Restored
              </button>
              <button
                type="button"
                onClick={() => setReportData(prev => ({ 
                  ...prev, 
                  description: "Pro tip: Car 3 typically has better air conditioning and fewer passengers." 
                }))}
                className="p-2 text-xs bg-muted hover:bg-muted/80 rounded-lg text-left transition-colors"
              >
                Helpful Tip
              </button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              loading={isSubmitting}
              disabled={!reportData?.type || !reportData?.route || !reportData?.station || !reportData?.severity || !reportData?.description}
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickReportModal;