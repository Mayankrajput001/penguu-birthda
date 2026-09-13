import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function Step1Pengu({ onNextStep, onUnlockStep }) {
  const [clickCount, setClickCount] = useState(0);
  const [hearts, setHearts] = useState([]);

  // Sequence of mini-texts and main-texts
  const storySequence = [
    {
      miniText: "✨ Tap on Pengu to start your birthday surprise! (Click 1/4)",
      mainText: "Hey my cute Penguu! Today is the most special day of the year. Tap on me to unlock your surprise step-by-step... 💖",
      moodEmoji: "🥰"
    },
    {
      miniText: "🔎 Scanning cuteness levels... (Click 2/4)",
      mainText: "Scan result: You are officially 1000% the prettiest, sweetest, and most adorable girl in the entire universe! ✨👑",
      moodEmoji: "🌸"
    },
    {
      miniText: "🐧 Quick penguin note! (Click 3/4)",
      mainText: "You might be my cute little Penguu, but you're not a real Antarctic penguin — you're my favorite girl in the world! 💌",
      moodEmoji: "👑"
    },
    {
      miniText: "💭 Secret confession! (Click 4/4)",
      mainText: "Every moment with you brings so much joy and happiness to my life. I made this magical place just for you! 🥰",
      moodEmoji: "💕"
    },
    {
      miniText: "🎉 SURPRISE UNLOCKED! 🎂✨",
      mainText: "Yay! You revealed all the secret messages! Now let's celebrate and cut your birthday cake together! 🍰🎈",
      moodEmoji: "🥳"
    }
  ];

  const currentStory = storySequence[Math.min(clickCount, storySequence.length - 1)];
  const isCompleted = clickCount >= storySequence.length - 1;

  const handlePenguClick = (e) => {
    sounds.playPop();
    sounds.playSparkle();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHearts((prev) => [
      ...prev.slice(-10),
      { id: Date.now(), x, y }
    ]);

    if (clickCount < storySequence.length - 1) {
      const nextCount = clickCount + 1;
      setClickCount(nextCount);

      if (nextCount === storySequence.length - 1) {
        if (onUnlockStep) onUnlockStep(2);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 max-w-2xl mx-auto text-center min-h-[75vh] sm:min-h-[80vh] w-full">
      
      {/* Step Indicator Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-sm"
      >
        <Sparkles size={13} className="text-pink-400 animate-spin shrink-0" />
        <span>Step 1 of 4: Secret Interactive Messages</span>
      </motion.div>

      {/* MINI TEXT (badge above Pengu avatar) */}
      <div className="min-h-[40px] sm:min-h-[44px] flex items-center justify-center mb-4 sm:mb-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mini-${clickCount}`}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-rose-500/20 border border-pink-400/40 text-pink-200 font-bold text-xs sm:text-sm md:text-base shadow-lg shadow-pink-500/10 backdrop-blur-md max-w-full"
          >
            {currentStory.miniText}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PENGU AVATAR (Interactive Clicker with Responsive Sizing) */}
      <div className="relative my-2 sm:my-4">
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ opacity: 1, y: h.y - 20, x: h.x, scale: 0.8 }}
            animate={{ opacity: 0, y: h.y - 100, scale: 1.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute pointer-events-none text-xl sm:text-2xl z-20"
          >
            💖
          </motion.span>
        ))}

        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full blur-2xl opacity-40 animate-pulseGlow"></div>

        <motion.div
          whileHover={{ scale: 1.04, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.92, rotate: -5 }}
          onClick={handlePenguClick}
          className="relative z-10 w-44 h-44 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-pink-400/50 p-3 sm:p-4 shadow-2xl cursor-pointer flex flex-col items-center justify-center group select-none"
        >
          <svg className="w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 50L100 20L125 50L110 42L100 50L90 42L75 50Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3" strokeLinejoin="round"/>
            <circle cx="100" cy="18" r="5" fill="#EF4444" />
            <circle cx="75" cy="50" r="3" fill="#F43F5E" />
            <circle cx="125" cy="50" r="3" fill="#F43F5E" />

            <ellipse cx="100" cy="115" rx="65" ry="70" fill="#1E293B" />
            <ellipse cx="100" cy="122" rx="45" ry="52" fill="#FFFFFF" />

            <circle cx="72" cy="104" r="10" fill="#FF80B3" opacity="0.6" />
            <circle cx="128" cy="104" r="10" fill="#FF80B3" opacity="0.6" />

            <circle cx="78" cy="95" r="9" fill="#0F172A" />
            <circle cx="122" cy="95" r="9" fill="#0F172A" />
            <circle cx="81" cy="92" r="3.5" fill="#FFFFFF" />
            <circle cx="125" cy="92" r="3.5" fill="#FFFFFF" />
            <circle cx="76" cy="97" r="1.5" fill="#FFFFFF" />
            <circle cx="120" cy="97" r="1.5" fill="#FFFFFF" />

            <path d="M92 102Q100 114 108 102Z" fill="#F97316" stroke="#EA580C" strokeWidth="2" />

            <ellipse cx="38" cy="120" rx="12" ry="30" fill="#0F172A" transform="rotate(20 38 120)" />
            <ellipse cx="162" cy="120" rx="12" ry="30" fill="#0F172A" transform="rotate(-20 162 120)" />

            <path d="M100 145C100 145 85 130 85 120C85 113 91 108 97 109C100 110 100 112 100 112C100 112 100 110 103 109C109 108 115 113 115 120C115 130 100 145 100 145Z" fill="#F43F5E" />

            <ellipse cx="78" cy="182" rx="14" ry="7" fill="#F97316" />
            <ellipse cx="122" cy="182" rx="14" ry="7" fill="#F97316" />
          </svg>

          <div className="absolute bottom-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-pink-500/80 text-white text-[10px] sm:text-[11px] font-semibold opacity-90 group-hover:scale-105 transition-transform flex items-center gap-1 shadow-md">
            <span>Tap Pengu!</span>
            <span>{currentStory.moodEmoji}</span>
          </div>
        </motion.div>
      </div>

      {/* MAIN TEXT */}
      <div className="w-full min-h-[90px] sm:min-h-[110px] my-3 sm:my-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`main-${clickCount}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-card-pink rounded-3xl p-4 sm:p-6 text-slate-100 max-w-xl w-full text-center shadow-xl border border-pink-400/30"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-pink-100">
              "{currentStory.mainText}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CLICK PROGRESS BAR */}
      <div className="w-full max-w-md bg-slate-800/80 rounded-full h-2 sm:h-2.5 my-2 sm:my-3 p-0.5 border border-white/10 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-rose-400 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((clickCount + 1) / storySequence.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* NEXT STEP BUTTON */}
      <div className="min-h-[50px] sm:min-h-[60px] flex items-center justify-center mt-2 sm:mt-4 w-full">
        {isCompleted ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              sounds.playSparkle();
              if (onUnlockStep) onUnlockStep(2);
              onNextStep();
            }}
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm sm:text-base md:text-lg shadow-xl shadow-pink-500/30 glow-pink flex items-center gap-2 sm:gap-3 group border border-pink-300/40"
          >
            <span>Next Step: Cut Birthday Cake</span>
            <span className="text-lg sm:text-xl">🎂</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        ) : (
          <button
            onClick={() => {
              const next = Math.min(clickCount + 1, storySequence.length - 1);
              setClickCount(next);
              if (next === storySequence.length - 1 && onUnlockStep) {
                onUnlockStep(2);
              }
            }}
            className="text-[11px] sm:text-xs text-pink-300/70 hover:text-pink-300 flex items-center gap-1 underline transition-colors"
          >
            <RefreshCw size={12} />
            <span>Tap Pengu or click to reveal next message ({clickCount + 1}/{storySequence.length})</span>
          </button>
        )}
      </div>

    </div>
  );
}
