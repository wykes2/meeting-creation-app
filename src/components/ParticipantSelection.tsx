import React, { useState, useMemo } from 'react';
import { Search, Users, UserPlus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { MeetingData } from '../App';

interface ParticipantSelectionProps {
  meetingData: MeetingData;
  onUpdate: (data: Partial<MeetingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ParticipantSelection: React.FC<ParticipantSelectionProps> = ({
  meetingData,
  onUpdate,
  onNext,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample participants data
  const allParticipants = [
    { id: '1', name: 'John Smith', email: 'john.smith@company.com', avatar: 'JS', role: 'Developer' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah.j@company.com', avatar: 'SJ', role: 'Designer' },
    { id: '3', name: 'Mike Davis', email: 'mike.davis@company.com', avatar: 'MD', role: 'Manager' },
    { id: '4', name: 'Emily Brown', email: 'emily.b@company.com', avatar: 'EB', role: 'Product Owner' },
    { id: '5', name: 'David Wilson', email: 'david.w@company.com', avatar: 'DW', role: 'Developer' },
    { id: '6', name: 'Lisa Anderson', email: 'lisa.a@company.com', avatar: 'LA', role: 'HR' },
    { id: '7', name: 'Tom Martinez', email: 'tom.m@company.com', avatar: 'TM', role: 'Developer' },
    { id: '8', name: 'Jessica Taylor', email: 'jessica.t@company.com', avatar: 'JT', role: 'Marketing' },
    { id: '9', name: 'Chris Lee', email: 'chris.lee@company.com', avatar: 'CL', role: 'Designer' },
    { id: '10', name: 'Amanda White', email: 'amanda.w@company.com', avatar: 'AW', role: 'Sales' }
  ];

  const filteredParticipants = useMemo(() => {
    if (!searchQuery) return allParticipants;
    
    const query = searchQuery.toLowerCase();
    return allParticipants.filter(
      participant =>
        participant.name.toLowerCase().includes(query) ||
        participant.email.toLowerCase().includes(query) ||
        participant.role.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const selectedParticipants = useMemo(() => {
    return allParticipants.filter(p => meetingData.participants.includes(p.id));
  }, [meetingData.participants]);

  const toggleParticipant = (participantId: string) => {
    const currentParticipants = meetingData.participants;
    const newParticipants = currentParticipants.includes(participantId)
      ? currentParticipants.filter(id => id !== participantId)
      : [...currentParticipants, participantId];
    
    onUpdate({ participants: newParticipants });
  };

  const removeParticipant = (participantId: string) => {
    const newParticipants = meetingData.participants.filter(id => id !== participantId);
    onUpdate({ participants: newParticipants });
  };

  const handleNext = () => {
    if (meetingData.type === '1-on-1' && meetingData.participants.length !== 1) {
      alert('Please select exactly one participant for a 1-on-1 meeting');
      return;
    }
    
    if (meetingData.type !== '1-on-1' && meetingData.participants.length < 2) {
      alert('Please select at least 2 participants for this meeting type');
      return;
    }
    
    onNext();
  };

  return (
    <div className="screen-container">
      <div className="screen-header">
        <h1 className="screen-title">Add Participants</h1>
        <p className="screen-subtitle">
          {meetingData.type === '1-on-1' 
            ? 'Select one person for your 1-on-1 meeting'
            : 'Select people to invite to your meeting'
          }
        </p>
      </div>

      {selectedParticipants.length > 0 && (
        <div className="selected-participants">
          <h3 className="selected-title">
            <Users size={16} className="mr-2" />
            Selected ({selectedParticipants.length})
          </h3>
          <div className="selected-list">
            {selectedParticipants.map((participant) => (
              <div key={participant.id} className="selected-participant">
                <div className="participant-avatar">
                  {participant.avatar}
                </div>
                <div className="participant-info">
                  <div className="participant-name">{participant.name}</div>
                  <div className="participant-email">{participant.email}</div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeParticipant(participant.id)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="search-container">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search participants by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="participants-list">
        {filteredParticipants.map((participant) => {
          const isSelected = meetingData.participants.includes(participant.id);
          return (
            <div
              key={participant.id}
              className={`participant-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleParticipant(participant.id)}
            >
              <div className="participant-avatar">
                {participant.avatar}
              </div>
              <div className="participant-info">
                <div className="participant-name">{participant.name}</div>
                <div className="participant-email">{participant.email}</div>
                <div className="participant-role">{participant.role}</div>
              </div>
              <div className="participant-checkbox">
                <div className={`checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <span>×</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="navigation-buttons">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleNext}
          disabled={meetingData.participants.length === 0}
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ParticipantSelection;
