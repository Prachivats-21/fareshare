import React, { useState } from 'react';
import Preloader from './components/Preloader';
import LandingPage from './components/LandingPage';
import ExploreDashboard from './components/ExploreDashboard';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentView, setCurrentView] = useState('story'); // 'story' | 'explore'

  return (
    <div className="relative min-h-screen bg-[#FAF8F5]">
      {/* 1. Cinematic Preloader (Eshan Singh / Vastworld inspired) */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 2. Main Views */}
      {currentView === 'story' ? (
        <LandingPage onLaunchApp={() => setCurrentView('explore')} />
      ) : (
        <ExploreDashboard onBackToStory={() => setCurrentView('story')} />
      )}
    </div>
  );
}
