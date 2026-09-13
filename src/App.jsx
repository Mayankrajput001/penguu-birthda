import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Step1Pengu from './components/Step1Pengu';
import Step2Cake from './components/Step2Cake';
import Step3Memories from './components/Step3Memories';
import Step4Letter from './components/Step4Letter';
import BackgroundParticles from './components/BackgroundParticles';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 relative flex flex-col justify-between select-none">
      {/* Background Animated Floating Particles & Stars */}
      <BackgroundParticles />

      {/* Top Navbar Header (Static visual indicator, non-clickable step jumping) */}
      <Navbar
        currentStep={currentStep}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Step Switcher */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-4">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Step1Pengu
                onNextStep={() => setCurrentStep(2)}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Step2Cake
                onNextStep={() => setCurrentStep(3)}
                onPrevStep={() => setCurrentStep(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Step3Memories
                onNextStep={() => setCurrentStep(4)}
                onPrevStep={() => setCurrentStep(2)}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Step4Letter
                onRestart={() => setCurrentStep(1)}
                onPrevStep={() => setCurrentStep(3)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-pink-200/50 relative z-10 border-t border-white/5">
        <p>Made with all my love for my cute Penguuu 🐧💖 • Happy Birthday!</p>
      </footer>
    </div>
  );
}
