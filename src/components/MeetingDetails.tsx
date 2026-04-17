import React, { useState } from 'react';
import { Calendar, Clock, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { MeetingData } from '../App';

interface MeetingDetailsProps {
  meetingData: MeetingData;
  onUpdate: (data: Partial<MeetingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  meetingData,
  onUpdate,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!meetingData.title.trim()) {
      newErrors.title = 'Meeting title is required';
    }
    
    if (!meetingData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!meetingData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (!meetingData.duration) {
      newErrors.duration = 'Duration is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const durationOptions = [
    '15 min',
    '30 min',
    '45 min',
    '1 hour',
    '1.5 hours',
    '2 hours',
    '3 hours',
    'Custom'
  ];

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h1 className="screen-title">Meeting Details</h1>
        <p className="screen-subtitle">Fill in the details for your {meetingData.type} meeting</p>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label className="form-label">
            <FileText size={16} className="mr-2" />
            Meeting Title
          </label>
          <input
            type="text"
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter meeting title"
            value={meetingData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <Calendar size={16} className="mr-2" />
              Date
            </label>
            <input
              type="date"
              className={`form-input ${errors.date ? 'error' : ''}`}
              value={meetingData.date}
              onChange={(e) => onUpdate({ date: e.target.value })}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Clock size={16} className="mr-2" />
              Time
            </label>
            <input
              type="time"
              className={`form-input ${errors.time ? 'error' : ''}`}
              value={meetingData.time}
              onChange={(e) => onUpdate({ time: e.target.value })}
            />
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Clock size={16} className="mr-2" />
            Duration
          </label>
          <div className="duration-grid">
            {durationOptions.map((duration) => (
              <button
                key={duration}
                className={`duration-option ${meetingData.duration === duration ? 'selected' : ''}`}
                onClick={() => onUpdate({ duration })}
              >
                {duration}
              </button>
            ))}
          </div>
          {errors.duration && <span className="error-message">{errors.duration}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">
            <FileText size={16} className="mr-2" />
            Description (Optional)
          </label>
          <textarea
            className="form-input form-textarea"
            placeholder="Add a description or agenda for the meeting"
            value={meetingData.description || ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default MeetingDetails;
