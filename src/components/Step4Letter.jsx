import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Mail, RotateCcw, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function Step4Letter({ onRestart, onPrevStep }) {
  const [isOpen, setIsOpen] = useState(false);

  // Start/keep background music playing continuously in Step 4
  useEffect(() => {
    sounds.startHappyBirthdayTune();
  }, []);

  const handleOpenLetter = () => {
    sounds.playSparkle();
    sounds.startHappyBirthdayTune();
    setIsOpen(true);

    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 max-w-3xl mx-auto text-center min-h-[75vh] sm:min-h-[80vh] w-full">
      
      {/* Header Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-sm"
      >
        <Sparkles size={13} className="text-pink-400 animate-spin shrink-0" />
        <span>Step 4 of 4: Heartfelt Love Letter 💌</span>
      </motion.div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 mb-1 sm:mb-2">
        A Birthday Message For My Penguuu 💖
      </h2>
      <p className="text-[11px] sm:text-xs md:text-sm text-pink-200/80 mb-4 sm:mb-6">
        {isOpen ? "Here is my message straight from the heart!" : "Tap on the envelope to open your birthday letter!"}
      </p>

      {/* ENVELOPE / LETTER CONTAINER */}
      <div className="relative my-2 sm:my-4 w-full flex items-center justify-center min-h-[300px] sm:min-h-[380px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED WAX ENVELOPE (Fully Responsive) */
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              whileHover={{ scale: 1.04, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenLetter}
              className="relative w-64 h-40 xs:w-72 xs:h-44 sm:w-80 sm:h-52 md:w-96 md:h-60 rounded-2xl bg-gradient-to-br from-pink-200 via-rose-100 to-amber-100 border-2 border-pink-300/80 shadow-2xl cursor-pointer flex flex-col items-center justify-center p-4 sm:p-6 text-slate-800 select-none glow-pink"
            >
              {/* Envelope Flap Triangle Lines */}
              <div className="absolute top-0 left-0 right-0 h-20 sm:h-28 border-b-2 border-pink-300/60 bg-pink-200/50 clip-triangle"></div>

              {/* Wax Seal Stamp */}
              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 shadow-xl border-2 border-rose-300 flex items-center justify-center text-white glow-pink">
                <Heart size={22} className="fill-white animate-pulse sm:w-6 sm:h-6" />
              </div>
              <span className="relative z-10 text-[10px] sm:text-xs font-bold text-rose-700 mt-2 tracking-wider uppercase">
                For Penguuu 💖
              </span>
              
              <div className="absolute bottom-2.5 sm:bottom-3 px-3 py-1 sm:px-4 sm:py-1 rounded-full bg-rose-500 text-white text-[10px] sm:text-[11px] font-bold shadow-md">
                Click to Open Letter ✉️
              </div>
            </motion.div>
          ) : (
            /* OPENED PARCHMENT LETTER PAPER (Fully Responsive) */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50/95 via-rose-50/95 to-pink-50/95 border-2 border-amber-200/80 rounded-3xl p-4 sm:p-6 md:p-10 shadow-2xl text-slate-800 text-left border-t-8 border-t-pink-400"
            >
              {/* Top Letter Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-pink-200">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm sm:text-base md:text-lg">
                  <Mail size={18} className="shrink-0" />
                  <span>Happy Birthday, Penguuu! 🥹🎂❤️</span>
                </div>
              </div>

              {/* Letter Text */}
              <div className="space-y-3 sm:space-y-4 text-slate-800 font-sans leading-relaxed text-xs sm:text-sm md:text-base">
                <p className="font-semibold text-rose-700">
                  Today is all about you, so I made this little something just for you. 🫶🏻
                </p>

                <p>
                  It may just be a website, but every little part of it carries a piece of our memories, our friendship, and how much you mean to me.
                </p>

                <p className="p-3 sm:p-3.5 rounded-2xl bg-pink-100/60 border border-pink-300/40 text-rose-900 font-medium">
                  Thank you for being my best friend, my constant, my comfort, and one of the most special people in my life. 🥹❤️
                </p>

                <p>
                  I hope this makes you smile, laugh, and maybe even get a little emotional. 😭😂
                </p>

                <div className="pt-2 border-t border-pink-200/60">
                  <p className="font-bold text-sm sm:text-base md:text-lg text-rose-600">
                    Happy Birthday once again, Penguuu! 🎂✨
                  </p>
                  <p className="text-slate-700 italic">
                    Here’s to you, to us, and to all the memories we haven’t made yet. ♾️❤️
                  </p>
                </div>
              </div>

              {/* Sign-off */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-pink-200 flex flex-col items-end">
                <span className="font-handwriting text-lg sm:text-xl md:text-2xl font-bold text-rose-600">
                  You’re stuck with me forever. 😌🫂
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-sans mt-0.5">Happy Birthday My Penguu! ✨</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RESTART CELEBRATION & BACK BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-8">
        <button
          onClick={() => {
            sounds.stopHappyBirthdayTune();
            sounds.playPop();
            onPrevStep();
          }}
          className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to Memories</span>
        </button>

        {isOpen && (
          <button
            onClick={() => {
              sounds.stopHappyBirthdayTune();
              sounds.playPop();
              onRestart();
            }}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <RotateCcw size={14} />
            <span>Replay Birthday Experience 🎈</span>
          </button>
        )}
      </div>

    </div>
  );
}
