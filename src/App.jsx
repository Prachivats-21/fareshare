import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import LandingPage from './components/LandingPage';
import ExploreDashboard from './components/ExploreDashboard';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentView, setCurrentView] = useState('story'); // 'story' | 'explore'

  // Disable browser automatic scroll restoration so it never forces previous scroll offset
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const resetScroll = () => {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }, 50);
  };

  const handleLaunchApp = () => {
    resetScroll();
    setCurrentView('explore');
  };

  const handleBackToStory = () => {
    resetScroll();
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
