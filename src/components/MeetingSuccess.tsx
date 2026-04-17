import React from 'react';
import { Check, Calendar, Share2, Plus, ArrowLeft } from 'lucide-react';
import { MeetingData } from '../App';

interface MeetingSuccessProps {
  meetingData: MeetingData;
  onNewMeeting: () => void;
}

const MeetingSuccess: React.FC<MeetingSuccessProps> = ({
  meetingData,
  onNewMeeting
}) => {
  const formatDateTime = () => {
    if (!meetingData.date || !meetingData.time) return '';
    
    const date = new Date(meetingData.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    return `${formattedDate} at ${meetingData.time}`;
  };

  const handleShare = () => {
    // In a real app, this would share the meeting link
    alert('Meeting link copied to clipboard!');
  };

  const handleAddToCalendar = () => {
    // In a real app, this would add to calendar
    alert('Meeting added to your calendar!');
  };

  return (
    <div className="screen-container">
      <div className="success-content">
        <div className="success-icon-container">
          <div className="success-icon">
            <Check size={48} className="text-white" />
          </div>
        </div>

        <div className="success-header">
          <h1 className="success-title">Meeting Created!</h1>
          <p className="success-subtitle">
            Your meeting has been scheduled successfully
          </p>
        </div>

        <div className="meeting-card">
          <div className="meeting-card-header">
            <h3 className="meeting-card-title">{meetingData.title}</h3>
            <span className="meeting-type-badge">{meetingData.type}</span>
          </div>

          <div className="meeting-details">
            <div className="meeting-detail-item">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <span>{formatDateTime()}</span>
            </div>
            <div className="meeting-detail-item">
              <span className="text-gray-500 mr-2">Duration:</span>
              <span>{meetingData.duration}</span>
            </div>
            <div className="meeting-detail-item">
              <span className="text-gray-500 mr-2">Participants:</span>
              <span>{meetingData.participants.length} invited</span>
            </div>
          </div>

          <div className="meeting-link">
            <div className="link-label">Meeting Link</div>
            <div className="link-container">
              <input
                type="text"
                className="link-input"
                value={`https://meet.company.com/${Math.random().toString(36).substr(2, 9)}`}
                readOnly
              />
              <button className="copy-btn" onClick={handleShare}>
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button className="action-btn" onClick={handleAddToCalendar}>
            <Calendar size={20} className="mr-2" />
            Add to Calendar
          </button>
          <button className="action-btn" onClick={handleShare}>
            <Share2 size={20} className="mr-2" />
            Share Meeting
          </button>
        </div>

        <div className="next-steps">
          <h4 className="next-steps-title">What's next?</h4>
          <ul className="next-steps-list">
            <li>Calendar invitations have been sent to all participants</li>
            <li>Meeting link is active and ready to use</li>
            <li>You'll receive a reminder 15 minutes before the meeting</li>
            <li>Meeting can be edited or cancelled from your dashboard</li>
          </ul>
        </div>

        <div className="final-actions">
          <button className="btn btn-outline" onClick={onNewMeeting}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </button>
          <button className="btn btn-primary" onClick={onNewMeeting}>
            <Plus size={16} className="mr-2" />
            Create Another Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingSuccess;
