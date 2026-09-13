import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundParticles() {
  // Generate random particles once
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      type: i % 3 === 0 ? '💖' : i % 3 === 1 ? '✨' : '🌸'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient lighting spots */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none opacity-40 hover:opacity-100 transition-opacity"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: ['0px', '-60px', '0px'],
            x: ['0px', '20px', '0px'],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.type}
        </motion.div>
      ))}
    </div>
  );
}
