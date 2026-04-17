import React from 'react';
import { Users, UserPlus, Building2, Calendar, Phone, Video } from 'lucide-react';

interface MeetingTypeSelectionProps {
  onSelect: (type: string) => void;
}

const MeetingTypeSelection: React.FC<MeetingTypeSelectionProps> = ({ onSelect }) => {
  const meetingTypes = [
    {
      id: '1-on-1',
      title: '1-on-1',
      description: 'Individual meeting with one person',
      icon: UserPlus,
      color: 'bg-blue-500'
    },
    {
      id: 'group',
      title: 'Group',
      description: 'Meeting with multiple participants',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Team meeting or standup',
      icon: Building2,
      color: 'bg-purple-500'
    },
    {
      id: 'phone-call',
      title: 'Phone Call',
      description: 'Audio-only meeting',
      icon: Phone,
      color: 'bg-orange-500'
    },
    {
      id: 'video-call',
      title: 'Video Call',
      description: 'Video conference meeting',
      icon: Video,
      color: 'bg-red-500'
    },
    {
      id: 'recurring',
      title: 'Recurring',
      description: 'Recurring scheduled meeting',
      icon: Calendar,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h1 className="screen-title">What type of meeting?</h1>
        <p className="screen-subtitle">Choose the meeting type that best fits your needs</p>
      </div>
      
      <div className="meeting-types-grid">
        {meetingTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              className="meeting-type-card"
              onClick={() => onSelect(type.title)}
            >
              <div className={`icon-container ${type.color}`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="meeting-type-title">{type.title}</h3>
              <p className="meeting-type-description">{type.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MeetingTypeSelection;
