import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, Wind, Scissors } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function Step2Cake({ onNextStep, onPrevStep, onUnlockStep }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeCut, setCakeCut] = useState(false);
  const [wishMessage, setWishMessage] = useState('');

  // Start/keep background music playing continuously once in Step 2
  useEffect(() => {
    sounds.startHappyBirthdayTune();
  }, []);

  const handleBlowCandles = () => {
    sounds.playBlowCandle();
    sounds.startHappyBirthdayTune();
    setCandlesLit(false);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setWishMessage("Make a wish, my cute Penguu! 💫 (Now cut your birthday cake below!)");
  };

  const handleCutCake = () => {
    sounds.playCakeCut();
    sounds.startHappyBirthdayTune();
    setCakeCut(true);

    if (onUnlockStep) onUnlockStep(3);

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 }
    });

    setWishMessage("Yay! Cake is cut! 🍰 Wishing you endless laughter, joy, and sweetness today and always! 💖");
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 max-w-2xl mx-auto text-center min-h-[75vh] sm:min-h-[80vh] w-full">
      
      {/* Header Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 shadow-sm"
      >
        <Sparkles size={13} className="text-pink-400 animate-spin shrink-0" />
        <span>Step 2 of 4: Interactive Birthday Cake</span>
      </motion.div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 mb-1 sm:mb-2">
        {candlesLit ? "Blow Your Birthday Candles! 🎂" : cakeCut ? "Cake is Cut! Happy Birthday! 🍰🎉" : "Cut Your Birthday Cake! 🔪✨"}
      </h2>
      <p className="text-[11px] sm:text-xs md:text-sm text-pink-200/80 mb-4 sm:mb-6 max-w-md">
        {candlesLit 
          ? "Tap the button below or click the candles to blow out your wish!" 
          : cakeCut 
            ? "Your cake slice is served with all my love!" 
            : "Click to slice the birthday cake!"}
      </p>

      {/* CAKE CANVAS CONTAINER */}
      <div className="relative my-2 sm:my-4 w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
        
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 via-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

        <motion.div
          animate={cakeCut ? { scale: [1, 1.05, 1] } : { y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer select-none"
          onClick={() => {
            if (candlesLit) handleBlowCandles();
            else if (!cakeCut) handleCutCake();
          }}
        >
          <svg className="w-52 h-52 xs:w-60 xs:h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 drop-shadow-2xl" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="250" rx="120" ry="25" fill="#334155" />
            <ellipse cx="150" cy="245" rx="115" ry="22" fill="#E2E8F0" opacity="0.9" />
            <ellipse cx="150" cy="242" rx="100" ry="18" fill="#F8FAFC" />

            <path d="M60 170 C60 170 60 220 150 230 C240 220 240 170 240 170 L240 190 C240 225 150 238 60 190 Z" fill="#F43F5E" />
            <ellipse cx="150" cy="170" rx="90" ry="20" fill="#FB7185" />

            <path d="M70 130 C70 130 70 170 150 180 C230 170 230 130 230 130 L230 150 C230 180 150 190 70 150 Z" fill="#FFF1F2" />
            <ellipse cx="150" cy="130" rx="80" ry="18" fill="#FCE7F3" />

            <path d="M80 90 C80 90 80 130 150 140 C220 130 220 90 220 90 L220 105 C220 135 150 145 80 105 Z" fill="#E11D48" />
            
            <path d="M80 90 Q90 110 100 90 Q110 115 120 90 Q135 120 150 90 Q165 120 180 90 Q190 110 200 90 Q210 110 220 90" stroke="#FFF1F2" strokeWidth="8" strokeLinecap="round" fill="none" />
            <ellipse cx="150" cy="90" rx="70" ry="16" fill="#FFF1F2" />

            <circle cx="110" cy="88" r="8" fill="#E11D48" />
            <circle cx="150" cy="84" r="9" fill="#E11D48" />
            <circle cx="190" cy="88" r="8" fill="#E11D48" />
            <circle cx="108" cy="86" r="2" fill="#FFFFFF" />
            <circle cx="148" cy="82" r="2.5" fill="#FFFFFF" />
            <circle cx="188" cy="86" r="2" fill="#FFFFFF" />

            {cakeCut && (
              <g>
                <path d="M150 90 L185 140 L150 180 Z" fill="#475569" opacity="0.3" />
                <path d="M150 90 L120 140 L150 180 Z" fill="#FFF1F2" opacity="0.9" />
                <circle cx="140" cy="120" r="3" fill="#F43F5E" />
                <circle cx="145" cy="135" r="3" fill="#FBBF24" />
                <circle cx="135" cy="145" r="3" fill="#60A5FA" />
              </g>
            )}

            <rect x="115" y="55" width="8" height="35" rx="4" fill="#F472B6" />
            <line x1="119" y1="55" x2="119" y2="48" stroke="#334155" strokeWidth="2" />
            <rect x="146" y="48" width="8" height="40" rx="4" fill="#60A5FA" />
            <line x1="150" y1="48" x2="150" y2="40" stroke="#334155" strokeWidth="2" />
            <rect x="177" y="55" width="8" height="35" rx="4" fill="#FBBF24" />
            <line x1="181" y1="55" x2="181" y2="48" stroke="#334155" strokeWidth="2" />

            {candlesLit ? (
              <g className="animate-pulse">
                <ellipse cx="119" cy="42" rx="5" ry="9" fill="#F59E0B" />
                <ellipse cx="119" cy="43" rx="2.5" ry="5" fill="#FEF08A" />
                <ellipse cx="150" cy="34" rx="6" ry="10" fill="#F59E0B" />
                <ellipse cx="150" cy="35" rx="3" ry="6" fill="#FEF08A" />
                <ellipse cx="181" cy="42" rx="5" ry="9" fill="#F59E0B" />
                <ellipse cx="181" cy="43" rx="2.5" ry="5" fill="#FEF08A" />
              </g>
            ) : (
              <g opacity="0.6">
                <path d="M119 45 Q115 35 122 25" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M150 38 Q155 28 148 18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M181 45 Q177 35 184 25" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            )}
          </svg>
        </motion.div>
      </div>

      {wishMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-card-pink rounded-2xl p-3.5 sm:p-4 my-2 max-w-lg w-full border border-pink-400/40 text-pink-100 font-semibold text-xs sm:text-sm md:text-base shadow-lg"
        >
          {wishMessage}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-6 w-full">
        <button
          onClick={() => {
            sounds.stopHappyBirthdayTune();
            sounds.playPop();
            onPrevStep();
          }}
          className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <ChevronLeft size={16} className="sm:w-4 sm:h-4" />
          <span>Back</span>
        </button>

        {candlesLit ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBlowCandles}
            className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs sm:text-sm md:text-base shadow-lg shadow-amber-500/25 flex items-center gap-2 border border-amber-300/40"
          >
            <Wind size={16} className="sm:w-4 sm:h-4" />
            <span>Blow Out Candles 💨</span>
          </motion.button>
        ) : !cakeCut ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCutCake}
            className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs sm:text-sm md:text-base shadow-lg shadow-pink-500/25 flex items-center gap-2 border border-pink-300/40 glow-pink"
          >
            <Scissors size={16} className="sm:w-4 sm:h-4" />
            <span>Cut Birthday Cake 🍰</span>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              sounds.stopHappyBirthdayTune();
              sounds.playSparkle();
              if (onUnlockStep) onUnlockStep(3);
              onNextStep();
            }}
            className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm sm:text-base md:text-lg shadow-xl shadow-pink-500/30 glow-pink flex items-center gap-2 sm:gap-3 border border-pink-300/40"
          >
            <span>Next Step: Our Memories 📸</span>
            <ChevronRight size={18} />
          </motion.button>
        )}
      </div>

    </div>
  );
}
