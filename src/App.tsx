import React, { useState } from 'react';
import MeetingTypeSelection from './components/MeetingTypeSelection';
import MeetingDetails from './components/MeetingDetails';
import ParticipantSelection from './components/ParticipantSelection';
import MeetingSummary from './components/MeetingSummary';
import MeetingSuccess from './components/MeetingSuccess';
import './styles/globals.css';
import './styles/meeting-app.css';

export interface MeetingData {
  type: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  description?: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [meetingData, setMeetingData] = useState<MeetingData>({
    type: '',
    title: '',
    date: '',
    time: '',
    duration: '',
    participants: [],
    description: ''
  });

  const updateMeetingData = (data: Partial<MeetingData>) => {
    setMeetingData(prev => ({ ...prev, ...data }));
  };

  const nextScreen = () => {
    setCurrentScreen(prev => Math.min(prev + 1, 5));
  };

  const prevScreen = () => {
    setCurrentScreen(prev => Math.max(prev - 1, 1));
  };

  const resetFlow = () => {
    setCurrentScreen(1);
    setMeetingData({
      type: '',
      title: '',
      date: '',
      time: '',
      duration: '',
      participants: [],
      description: ''
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return (
          <MeetingTypeSelection
            onSelect={(type) => {
              updateMeetingData({ type });
              nextScreen();
            }}
          />
        );
      case 2:
        return (
          <MeetingDetails
            meetingData={meetingData}
            onUpdate={updateMeetingData}
            onNext={nextScreen}
            onBack={prevScreen}
          />
        );
      case 3:
        return (
          <ParticipantSelection
            meetingData={meetingData}
            onUpdate={updateMeetingData}
            onNext={nextScreen}
            onBack={prevScreen}
          />
        );
      case 4:
        return (
          <MeetingSummary
            meetingData={meetingData}
            onNext={nextScreen}
            onBack={prevScreen}
            onUpdate={updateMeetingData}
          />
        );
      case 5:
        return (
          <MeetingSuccess
            meetingData={meetingData}
            onNewMeeting={resetFlow}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="meeting-app">
      <div className="app-container">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
