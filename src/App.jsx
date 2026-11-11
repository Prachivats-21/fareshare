import React, { useState } from 'react';
import Preloader from './components/Preloader';
import LandingPage from './components/LandingPage';
import ExploreDashboard from './components/ExploreDashboard';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentView, setCurrentView] = useState('story'); // 'story' | 'explore'

  const handleLaunchApp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurrentView('explore');
  };

  const handleBackToStory = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurrentView('story');
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5]">
      {/* 1. Cinematic Preloader (Eshan Singh / Vastworld inspired) */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 2. Main Views */}
      {currentView === 'story' ? (
        <LandingPage onLaunchApp={handleLaunchApp} />
      ) : (
        <ExploreDashboard onBackToStory={handleBackToStory} />
      )}
    </div>
  );
}
