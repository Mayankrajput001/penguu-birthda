import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ChevronLeft, Heart, ZoomIn, Grid, BookOpen, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function Step3Memories({ onNextStep, onPrevStep }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'slideshow'
  const [activeSlide, setActiveSlide] = useState(0);
  const [heartCounts, setHeartCounts] = useState({ 0: 12, 1: 18, 2: 15, 3: 25 });
  const [floatingHearts, setFloatingHearts] = useState([]);

  // 100% Exact order where File 1 = Card 1, File 2 = Card 2, File 3 = Card 3, File 4 = Card 4
  const memoryPhotos = [
    {
      id: 1,
      url: '/images/pengu1.jpeg', // File 1: Starry blanket
      title: 'Guarding My Little Penguu 🛡️💖',
      subtitle: 'You are always safe, protected & deeply cared for with me! 😌🫂',
      dateTag: 'Safe & Sound 🛡️',
      badge: 'Always Protected',
      note: 'Wrapped up in warmth, safe and sound! No matter what happens in the world, you will always be safe, protected, and deeply cared for with me. I’ll always guard my cute little Penguu, be your safe haven, and stay by your side forever! 🛡️✨',
      sweetQuote: 'With me, my little Penguu is always safe, cherished, and protected. 💖'
    },
    {
      id: 2,
      url: '/images/pengu2.jpeg', // File 2: Selfie with round glasses
      title: 'Prettiest Smile 💖',
      subtitle: 'That warm, soft smile with round glasses!',
      dateTag: 'Pure Sunshine ☀️',
      badge: 'Cute Glasses',
      note: 'That gentle, radiant smile with your cute round glasses! Every time I look at this photo, my whole day instantly brightens up. You are officially the prettiest and sweetest girl in the universe! 🥰',
      sweetQuote: 'Your smile is my favorite view in the whole wide world.'
    },
    {
      id: 3,
      url: '/images/pengu3.jpeg', // File 3: Baby photo with top ponytail
      title: 'Baby Penguu 🥹',
      subtitle: 'Where it all started—cutest top ponytail ever!',
      dateTag: 'Baby Era 🌸',
      badge: 'Cutest Ponytail',
      note: 'Look at that adorable little top ponytail and those big curious eyes! You were 1000% cuteness overload even back then. Some people are just born with magic in their eyes... and you definitely were! 💖',
      sweetQuote: 'Little Penguu, big dreams, and infinite cuteness! ✨'
    },
    {
      id: 4,
      url: '/images/pengu4.jpeg', // File 4: Couple mirror selfie
      title: 'Together Forever ♾️❤️',
      subtitle: 'You’re stuck with me forever & always! 😌🫂',
      dateTag: 'Best Duo Ever 🫂',
      badge: 'Mirror Selfie',
      note: 'The ultimate duo! You’re stuck with me forever and ever whether you like it or not. Thank you for being my constant, my comfort, my favorite person, and my best friend! 😌🫂',
      sweetQuote: 'Side by side, today, tomorrow, and forever.'
    }
  ];

  // Handle heart reactions on cards
  const handleAddHeart = (index, e) => {
    e.stopPropagation();
    sounds.playPop();
    setHeartCounts(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));

    // Spawn floating heart
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX || window.innerWidth / 2,
      y: e.clientY || window.innerHeight / 2
    };
    setFloatingHearts(prev => [...prev.slice(-15), newHeart]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % memoryPhotos.length);
        sounds.playPop();
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + memoryPhotos.length) % memoryPhotos.length);
        sounds.playPop();
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const selectedPhoto = selectedPhotoIndex !== null ? memoryPhotos[selectedPhotoIndex] : null;

  return (
    <div className="flex flex-col items-center justify-center py-4 px-3 sm:px-4 max-w-4xl mx-auto text-center relative min-h-[75vh] w-full">
      
      {/* Floating Reaction Hearts */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ opacity: 1, x: h.x - 12, y: h.y - 20, scale: 0.8 }}
          animate={{ opacity: 0, y: h.y - 120, x: h.x + (Math.random() * 40 - 20), scale: 1.6 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="fixed pointer-events-none text-xl sm:text-2xl z-50"
        >
          💖
        </motion.div>
      ))}

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-semibold mb-2.5 sm:mb-3 shadow-sm"
      >
        <Sparkles size={13} className="text-pink-400 animate-spin shrink-0" />
        <span>Step 3 of 4: Our Favorite Memories 📸</span>
      </motion.div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300 mb-1">
        Memories With My Penguu 💖
      </h2>
      <p className="text-[11px] sm:text-xs md:text-sm text-pink-200/80 mb-3 sm:mb-4 max-w-md">
        Four special snapshots. Tap any photo to enlarge and read secret memory notes!
      </p>

      {/* VIEW MODE TOGGLE (Grid vs Slideshow) */}
      <div className="flex items-center justify-center gap-2 bg-slate-800/80 p-1 rounded-full border border-white/10 mb-3 sm:mb-4">
        <button
          onClick={() => {
            sounds.playPop();
            setViewMode('grid');
          }}
          className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
            viewMode === 'grid'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Grid size={13} />
          <span>Polaroid Grid</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            setViewMode('slideshow');
          }}
          className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
            viewMode === 'slideshow'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen size={13} />
          <span>Memory Book</span>
        </button>
      </div>

      {/* MODE 1: COMPACT 4 POLAROID CARDS GRID (1 col on mobile, 2 cols on small tablet, 4 cols on desktop) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full my-1">
          {memoryPhotos.map((item, idx) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  sounds.playPop();
                  setSelectedPhotoIndex(idx);
                }}
                className="relative bg-slate-100 p-2.5 rounded-2xl shadow-md border border-white cursor-pointer group text-slate-800 transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Tape Accent */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-pink-300/80 border border-white/60 rotate-[-2deg] rounded-sm z-20 pointer-events-none shadow-xs flex items-center justify-center">
                  <span className="text-[9px] font-bold text-pink-800 uppercase tracking-tighter">PENGUU</span>
                </div>

                {/* Compact Clean Photo Box */}
                <div className="relative w-full h-36 sm:h-40 md:h-44 rounded-xl bg-slate-900/5 border border-slate-200 mb-2 overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain rounded-md shadow-xs"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <div className="px-2 py-1 rounded-full bg-white/90 text-slate-900 text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <ZoomIn size={12} />
                      <span>Tap to Open 💌</span>
                    </div>
                  </div>

                  {/* Memory Index Pill */}
                  <div className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded-full bg-slate-900/80 text-[9px] text-pink-200 font-bold flex items-center gap-1">
                    <Heart size={9} className="fill-pink-400 text-pink-400" />
                    <span>#{idx + 1}</span>
                  </div>
                </div>

                {/* Polaroid Caption & Details */}
                <div className="text-left px-0.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs md:text-sm text-slate-800 truncate mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-handwriting text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
                      "{item.subtitle}"
                    </p>
                  </div>

                  {/* Interactive Heart Counter Row */}
                  <div className="pt-2 mt-1 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-[10px] text-pink-600 font-medium">Click to open 💖</span>
                    <button
                      onClick={(e) => handleAddHeart(idx, e)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold transition-colors"
                      title="Send love"
                    >
                      <Heart size={11} className="fill-pink-500 text-pink-500 animate-pulse" />
                      <span>{heartCounts[idx] || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODE 2: SLIDESHOW / MEMORY BOOK VIEW */}
      {viewMode === 'slideshow' && (
        <div className="w-full max-w-2xl my-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/90 border border-pink-500/30 rounded-3xl p-3.5 sm:p-4 shadow-2xl flex flex-col md:flex-row items-center gap-3 sm:gap-4"
            >
              {/* Photo Display Frame (Uncropped full photo) */}
              <div className="relative w-full md:w-1/2 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/10 shrink-0 p-2">
                <img
                  src={memoryPhotos[activeSlide].url}
                  alt={memoryPhotos[activeSlide].title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-lg cursor-pointer"
                  onClick={() => {
                    sounds.playPop();
                    setSelectedPhotoIndex(activeSlide);
                  }}
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-pink-500 text-white font-bold text-[10px] shadow-md">
                  {memoryPhotos[activeSlide].dateTag}
                </div>
              </div>

              {/* Note Details Side */}
              <div className="flex-1 text-left space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-pink-400 tracking-wider uppercase">
                    Memory {activeSlide + 1} of {memoryPhotos.length}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[10px] font-semibold">
                    {memoryPhotos[activeSlide].badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-pink-200">
                  {memoryPhotos[activeSlide].title}
                </h3>

                <p className="text-xs text-pink-300/90 italic font-medium">
                  "{memoryPhotos[activeSlide].subtitle}"
                </p>

                {/* Memory Note Box */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/80 border border-pink-400/20 text-slate-200 font-sans text-xs leading-relaxed">
                  <p>{memoryPhotos[activeSlide].note}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setActiveSlide((prev) => (prev - 1 + memoryPhotos.length) % memoryPhotos.length);
                      }}
                      className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setActiveSlide((prev) => (prev + 1) % memoryPhotos.length);
                      }}
                      className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <button
                    onClick={(e) => handleAddHeart(activeSlide, e)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-bold text-xs hover:bg-pink-500/30 transition-colors"
                  >
                    <Heart size={12} className="fill-pink-400 text-pink-400" />
                    <span>Send Love ({heartCounts[activeSlide] || 0})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-pink-500/40 rounded-3xl p-3.5 sm:p-5 max-w-xl w-full text-center relative shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
            >
              {/* Top Modal Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold">
                    Memory #{selectedPhotoIndex + 1} of {memoryPhotos.length}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">{selectedPhoto.dateTag}</span>
                </div>

                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Lightbox Photo Display Container (Guarantees zero zoom) */}
              <div className="relative w-full h-[36vh] sm:h-[42vh] md:h-[45vh] max-h-[400px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/10 mb-3 group p-2">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
                />

                <button
                  onClick={() => {
                    sounds.playPop();
                    setSelectedPhotoIndex((prev) => (prev - 1 + memoryPhotos.length) % memoryPhotos.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-pink-500 text-white border border-white/20 transition-colors shadow-lg"
                  title="Previous Photo"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => {
                    sounds.playPop();
                    setSelectedPhotoIndex((prev) => (prev + 1) % memoryPhotos.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 hover:bg-pink-500 text-white border border-white/20 transition-colors shadow-lg"
                  title="Next Photo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Memory Details */}
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-pink-200">
                    {selectedPhoto.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      handleAddHeart(selectedPhotoIndex, e);
                      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500 text-white font-bold text-xs shadow-md hover:bg-pink-600 transition-colors"
                  >
                    <Heart size={12} className="fill-white text-white" />
                    <span>Love ({heartCounts[selectedPhotoIndex] || 0})</span>
                  </button>
                </div>

                <p className="text-xs text-pink-300 font-medium italic">
                  "{selectedPhoto.subtitle}"
                </p>

                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800/90 border border-pink-400/20 text-slate-200 text-xs leading-relaxed">
                  {selectedPhoto.note}
                </div>

                <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-200 text-xs font-handwriting text-sm font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Sparkles size={13} className="text-pink-400 shrink-0" />
                    <span>{selectedPhoto.sweetQuote}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="mt-3 px-5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors border border-white/10"
              >
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP NAVIGATION BUTTONS */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-6">
        <button
          onClick={() => {
            sounds.playPop();
            onPrevStep();
          }}
          className="px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 font-semibold text-xs md:text-sm flex items-center gap-1 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            sounds.playSparkle();
            onNextStep();
          }}
          className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm md:text-base shadow-lg shadow-pink-500/30 glow-pink flex items-center gap-2 border border-pink-300/40"
        >
          <span>Next Step: Read My Letter 💌</span>
          <ChevronRight size={18} />
        </motion.button>
      </div>

    </div>
  );
}
