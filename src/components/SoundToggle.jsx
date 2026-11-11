import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getSoundEnabled, setSoundEnabled, playToggle } from '../utils/sound';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(getSoundEnabled());

  const handleToggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
    if (next) {
      setTimeout(() => playToggle(), 50);
    }
  };

  return (
    <button
      onClick={handleToggle}
      title={enabled ? "Mute interactive sounds" : "Enable tactile sound effects"}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 bg-white/80 backdrop-blur-sm border-[#E7E4DC] text-[#4B524E] hover:text-[#1A3D34] hover:border-[#1A3D34] shadow-sm"
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="hidden sm:inline">Sound ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Mute</span>
        </>
      )}
    </button>
  );
}
