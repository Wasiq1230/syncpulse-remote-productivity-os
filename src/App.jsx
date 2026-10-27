import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CommandPalette from './components/CommandPalette';
import PulseOverview from './components/views/PulseOverview';
import TimezoneRadar from './components/views/TimezoneRadar';
import FocusCommandCenter from './components/views/FocusCommandCenter';
import AsyncStandups from './components/views/AsyncStandups';
import SprintKanban from './components/views/SprintKanban';
import TeamWellbeing from './components/views/TeamWellbeing';
import IntegrationsSettings from './components/views/IntegrationsSettings';
import NewTaskModal from './components/modals/NewTaskModal';
import SubmitStandupModal from './components/modals/SubmitStandupModal';
import AudioHuddleModal from './components/modals/AudioHuddleModal';

export default function App() {
  const { activeView } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <PulseOverview />;
      case 'timezone':
        return <TimezoneRadar />;
      case 'focus':
        return <FocusCommandCenter />;
      case 'standups':
        return <AsyncStandups />;
      case 'kanban':
        return <SprintKanban />;
      case 'wellbeing':
        return <TeamWellbeing />;
      case 'integrations':
        return <IntegrationsSettings />;
      default:
        return <PulseOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {renderView()}
        </main>
      </div>

      {/* Global Modals & Overlays */}
      <CommandPalette />
      <NewTaskModal />
      <SubmitStandupModal />
      <AudioHuddleModal />
    </div>
  );
}
