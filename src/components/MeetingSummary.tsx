import React from 'react';
import { Calendar, Clock, Users, FileText, ArrowLeft, Check, Edit } from 'lucide-react';
import { MeetingData } from '../App';

interface MeetingSummaryProps {
  meetingData: MeetingData;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: Partial<MeetingData>) => void;
}

const MeetingSummary: React.FC<MeetingSummaryProps> = ({
  meetingData,
  onNext,
  onBack,
  onUpdate
}) => {
  const formatDateTime = () => {
    if (!meetingData.date || !meetingData.time) return 'Not set';
    
    const date = new Date(meetingData.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `${formattedDate} at ${meetingData.time}`;
  };

  const getParticipantNames = () => {
    // This would normally come from your participants data
    // For now, we'll show the count
    return `${meetingData.participants.length} participant${meetingData.participants.length !== 1 ? 's' : ''}`;
  };

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h1 className="screen-title">Meeting Summary</h1>
        <p className="screen-subtitle">Review your meeting details before creating</p>
      </div>

      <div className="summary-card">
        <div className="summary-header">
          <h2 className="meeting-title">{meetingData.title}</h2>
          <span className="meeting-type-badge">{meetingData.type}</span>
        </div>

        <div className="summary-details">
          <div className="summary-item">
            <div className="summary-icon">
              <Calendar size={20} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Date & Time</div>
              <div className="summary-value">{formatDateTime()}</div>
            </div>
            <button 
              className="edit-btn"
              onClick={() => {
                // This would navigate back to details screen
                onBack();
              }}
            >
              <Edit size={16} />
            </button>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <Clock size={20} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Duration</div>
              <div className="summary-value">{meetingData.duration}</div>
            </div>
            <button 
              className="edit-btn"
              onClick={() => {
                // This would navigate back to details screen
                onBack();
              }}
            >
              <Edit size={16} />
            </button>
          </div>

          <div className="summary-item">
            <div className="summary-icon">
              <Users size={20} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Participants</div>
              <div className="summary-value">{getParticipantNames()}</div>
            </div>
            <button 
              className="edit-btn"
              onClick={() => {
                // This would navigate back to participants screen
                onBack();
              }}
            >
              <Edit size={16} />
            </button>
          </div>

          {meetingData.description && (
            <div className="summary-item">
              <div className="summary-icon">
                <FileText size={20} />
              </div>
              <div className="summary-content">
                <div className="summary-label">Description</div>
                <div className="summary-value description">{meetingData.description}</div>
              </div>
              <button 
                className="edit-btn"
                onClick={() => {
                  // This would navigate back to details screen
                  onBack();
                }}
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="summary-actions">
          <div className="action-item">
            <Check size={20} className="action-icon text-green-500" />
            <span>Calendar invitation will be sent to all participants</span>
          </div>
          <div className="action-item">
            <Check size={20} className="action-icon text-green-500" />
            <span>Meeting link will be generated automatically</span>
          </div>
          <div className="action-item">
            <Check size={20} className="action-icon text-green-500" />
            <span>Reminder will be set for 15 minutes before</span>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        <button className="btn btn-primary btn-large" onClick={onNext}>
          <Check size={16} className="mr-2" />
          Create Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingSummary;
