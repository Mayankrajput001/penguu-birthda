import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, ChevronLeft, Heart, ZoomIn, Grid, BookOpen, X } from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "../utils/soundEffects";

import web1_photo1 from "../assets/web1_photo1.jpg";
import web1_photo2 from "../assets/web1_photo2.jpg";
import web1_photo3 from "../assets/web1_photo3.jpg";
import web1_photo4 from "../assets/web1_photo4.jpg";

export default function Step3Memories({ onNextStep, onPrevStep }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [activeSlide, setActiveSlide] = useState(0);
  const [heartCounts, setHeartCounts] = useState({ 0: 12, 1: 18, 2: 15, 3: 25 });
  const [floatingHearts, setFloatingHearts] = useState([]);

  const memoryPhotos = [
    {
      id: 1,
      url: web1_photo1,
      title: "Our Mirror Selfie Together 🤳💖",
      subtitle: "Side by side, looking so cute and stylish!",
      dateTag: "Safe & Sound 🛡️",
      badge: "Always Together",
      note: "Standing together in front of the mirror, looking so handsome and cute! No matter where we are, having you right beside me makes every day brighter and happier.",
      sweetQuote: "With me, my little Penguu is always safe, cherished, and protected. 💖"
    },
    {
      id: 2,
      url: web1_photo2,
      title: "Baby Penguu 🥹",
      subtitle: "Where it all started—cutest top ponytail ever!",
      dateTag: "Baby Era 🌸",
      badge: "Cutest Ponytail",
      note: "Look at that adorable little top ponytail and those big curious eyes! You were 1000% cuteness overload even back then. Some people are just born with magic in their eyes... and you definitely were! 💖",
      sweetQuote: "Little Penguu, big dreams, and infinite cuteness! ✨"
    },
    {
      id: 3,
      url: web1_photo3,
      title: "Prettiest Sunshine Smile 🌸",
      subtitle: "Soft aesthetic portrait that steals my heart!",
      dateTag: "Pure Sunshine ☀️",
      badge: "Angel Vibes",
      note: "Your soft hair, gentle smile, and effortless grace—everything about this picture is just so breathtaking. You don’t even have to try... you are naturally the prettiest girl in the universe! 🥰",
      sweetQuote: "Your smile is my favorite view in the whole wide world."
    },
    {
      id: 4,
      url: web1_photo4,
      title: "Together Forever ♾️❤️",
      subtitle: "You’re stuck with me forever & always! 😌🫂",
      dateTag: "Best Duo ♾️",
      badge: "Matchy Matchy",
      note: "Matching in style and smiling together! Thank you for being the sweetest, kindest, and most amazing partner. You’re stuck with me forever and ever, my cute Penguu! 🥂",
      sweetQuote: "Side by side, today, tomorrow, and for all our birthdays to come. ♾️❤️"
    }
  ];

  const handleAddHeart = (idx, e) => {
    e.stopPropagation();
    sounds.playPop();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    const newHeart = {
      id: Date.now() + Math.random(),
      x,
      y
    };

    setFloatingHearts((prev) => [...prev, newHeart]);
    setHeartCounts((prev) => ({
      ...prev,
      [idx]: (prev[idx] || 0) + 1
    }));

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const selectedPhoto = selectedPhotoIndex !== null ? memoryPhotos[selectedPhotoIndex] : null;

  return (
    <div className="flex flex-col items-center justify-center py-2 sm:py-4 px-3 sm:px-4 max-w-4xl mx-auto text-center min-h-[78vh] sm:min-h-[82vh] w-full relative">
      
      {/* Floating Hearts Animation Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: h.y, x: h.x - 12, scale: 0.8 }}
            animate={{ opacity: 0, y: h.y - 120, scale: 1.4, x: h.x - 12 + (Math.random() * 40 - 20) }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-rose-500 text-xl font-bold"
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] sm:text-xs font-bold mb-3 shadow-sm"
      >
        <Sparkles size={13} className="text-pink-400 shrink-0" />
        <span>Step 3 of 5: Birthday Memories Scrapbook 📸</span>
      </motion.div>

      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 mb-1 leading-tight">
        Precious Birthday Memories 💖
      </h2>
      <p className="text-xs sm:text-sm text-pink-200/90 max-w-xl mb-4 leading-relaxed">
        Tap any memory card to view full resolution and read the story written for it! 📸✨
      </p>

      {/* View Mode Selector Bar */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-4 px-2">
        <span className="text-xs font-bold text-pink-200 flex items-center gap-1.5">
          <span>Our Photo Gallery 🖼️</span>
        </span>

        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-pink-500/20">
          <button
            onClick={() => {
              sounds.playPop();
              setViewMode("grid");
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              viewMode === "grid"
                ? "bg-pink-500 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Grid size={13} />
            <span>Grid</span>
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              setViewMode("slideshow");
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              viewMode === "slideshow"
                ? "bg-pink-500 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen size={13} />
            <span>Slideshow</span>
          </button>
        </div>
      </div>

      {/* GRID VIEW MODE */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full mb-6">
          {memoryPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sounds.playSparkle();
                setSelectedPhotoIndex(idx);
              }}
              className="cursor-pointer group select-none flex flex-col"
            >
              <div className="bg-slate-900/90 border-2 border-pink-500/30 hover:border-pink-400/80 rounded-2xl p-3 shadow-xl flex flex-col justify-between h-full transition-all">
                {/* Photo Container: Natural Aspect Ratio, Zero Cropping */}
                <div className="relative w-full bg-slate-950 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center p-1 min-h-[220px]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-auto max-h-[340px] object-contain rounded-lg group-hover:scale-102 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 text-[10px] font-bold text-pink-300 border border-pink-500/30 backdrop-blur-sm">
                    {photo.badge}
                  </span>
                </div>

                {/* Info & Heart Button */}
                <div className="pt-3 text-left flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs sm:text-sm text-pink-100 line-clamp-1">
                      {photo.title}
                    </h3>
                    <button
                      onClick={(e) => handleAddHeart(idx, e)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-bold border border-rose-500/30 text-[11px] shrink-0"
                    >
                      <Heart size={11} className="fill-rose-500 text-rose-500" />
                      <span>{heartCounts[idx] || 0}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-pink-300/70 line-clamp-1">
                    {photo.subtitle}
                  </p>

                  <div className="w-full py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors mt-1">
                    <ZoomIn size={12} />
                    <span>Read Story 💌</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* SLIDESHOW VIEW MODE */}
      {viewMode === "slideshow" && (
        <div className="w-full max-w-2xl mx-auto mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900 border-2 border-pink-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl text-left relative"
            >
              <div className="relative w-full h-[32vh] sm:h-[40vh] max-h-[360px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-white/10 mb-4 p-2">
                <img
                  src={memoryPhotos[activeSlide].url}
                  alt={memoryPhotos[activeSlide].title}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-pink-200">
                    {memoryPhotos[activeSlide].title}
                  </h3>
                  <span className="text-xs text-pink-300/70 font-semibold">
                    {activeSlide + 1} / {memoryPhotos.length}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{memoryPhotos[activeSlide].note}"
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div className="flex items-center gap-2">
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
