import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ currentStep, isMuted, setIsMuted }) {
  const steps = [
    { id: 1, label: 'Pengu Story', icon: '🐧' },
    { id: 2, label: 'Cut Cake', icon: '🎂' },
    { id: 3, label: 'Memories', icon: '📸' },
    { id: 4, label: 'My Letter', icon: '💌' },
  ];

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) sounds.playSparkle();
  };

  return (
    <header className="sticky top-0 z-50 px-2.5 sm:px-4 py-2.5 sm:py-3 bg-slate-900/85 backdrop-blur-md border-b border-pink-500/20 select-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Left: Brand Info */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-base sm:text-lg shadow-md">
            🐧
          </div>
          <div className="hidden sm:block text-left">
            <h1 className="font-bold text-xs sm:text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300">
              For My Penguu 💖
            </h1>
            <p className="text-[9px] sm:text-[10px] text-pink-300/70 font-medium">World's Best Birthday Surprise</p>
          </div>
        </div>

        {/* Center: Step Indicator Pills */}
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-800/80 p-1 rounded-full border border-white/10 shrink-0">
          {steps.map((s) => {
            const isActive = currentStep === s.id;

            return (
              <div
                key={s.id}
                className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 pointer-events-none ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 scale-105'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                <span className="text-xs sm:text-sm">{s.icon}</span>
                <span className="hidden md:inline">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Sound Toggle Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleMuteToggle}
            className={`p-1.5 sm:p-2 rounded-full border transition-all ${
              isMuted
                ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                : 'bg-pink-500/20 border-pink-500/40 text-pink-300 glow-pink'
            }`}
            title={isMuted ? 'Unmute sound FX' : 'Mute sound FX'}
          >
            {isMuted ? <VolumeX size={16} className="sm:w-4 sm:h-4" /> : <Volume2 size={16} className="sm:w-4 sm:h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
}
