import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Check, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function PhotoUploaderModal({ photos, onSavePhotos, onClose, onResetDefaults }) {
  const defaultPhotos = [
    {
      id: 1,
      url: '/images/pengu1.jpeg',
      title: 'Cozy Starry Night ✨',
      subtitle: 'Quiet, comfortable & peaceful moments.'
    },
    {
      id: 2,
      url: '/images/pengu2.jpeg',
      title: 'Prettiest Smile 💖',
      subtitle: 'That warm, soft smile with round glasses!'
    },
    {
      id: 3,
      url: '/images/pengu3.jpeg',
      title: 'Baby Penguu 🥹',
      subtitle: 'Where it all started—cutest top ponytail ever!'
    },
    {
      id: 4,
      url: '/images/pengu4.jpeg',
      title: 'Together Forever ♾️❤️',
      subtitle: 'You’re stuck with me forever & always! 😌🫂'
    }
  ];

  const [photoList, setPhotoList] = useState(photos && photos.length ? photos : defaultPhotos);

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = [...photoList];
        updated[index] = {
          ...updated[index],
          url: reader.result
        };
        setPhotoList(updated);
        sounds.playPop();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (index, field, value) => {
    const updated = [...photoList];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setPhotoList(updated);
  };

  const handleSave = () => {
    onSavePhotos(photoList);
    sounds.playSparkle();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-pink-500/30 rounded-3xl p-4 sm:p-6 max-w-2xl w-full text-left shadow-2xl my-4 sm:my-8 relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-pink-300 font-bold text-base sm:text-lg">
            <ImageIcon size={18} className="sm:w-5 sm:h-5" />
            <span>Customize 4 Memory Photos</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 my-2 sm:my-3">
          Upload 4 images from your device and customize their captions! They will be saved on your browser.
        </p>

        {/* 4 Photo Slot Inputs */}
        <div className="space-y-3 sm:space-y-4 overflow-y-auto pr-1 flex-1 my-2">
          {photoList.map((photo, idx) => (
            <div
              key={photo.id || idx}
              className="p-3 rounded-2xl bg-slate-800/80 border border-white/10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
            >
              {/* Photo Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-700 shrink-0 border border-pink-500/30">
                <img
                  src={photo.url}
                  alt={`Slot ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center cursor-pointer text-white text-[10px] sm:text-[11px] font-bold gap-1">
                  <Upload size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span>Change</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(idx, e)}
                  />
                </label>
              </div>

              {/* Title & Caption Inputs */}
              <div className="flex-1 w-full space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-pink-400">Photo Slot #{idx + 1}</span>
                </div>
                <input
                  type="text"
                  value={photo.title}
                  onChange={(e) => handleTextChange(idx, 'title', e.target.value)}
                  placeholder="Photo Title (e.g. Cute Smile)"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-pink-400"
                />
                <input
                  type="text"
                  value={photo.subtitle}
                  onChange={(e) => handleTextChange(idx, 'subtitle', e.target.value)}
                  placeholder="Photo Subtitle (e.g. My favorite memory)"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              if (onResetDefaults) onResetDefaults();
              setPhotoList(defaultPhotos);
              onClose();
            }}
            className="text-[11px] sm:text-xs text-slate-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset to Default Uploaded Photos</span>
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Save Memories</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
