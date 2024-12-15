import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface IntroSequenceProps {
  introStep?: number;
  onNextMessage?: () => void;
}

export const introMessages = [
  {
    title: "The Sacred Tokyo Journey",
    message: "Navigate through the neon-lit streets of our spiritual center in Japan. Decode the coordinates that led to where it all began."
  },
  {
    title: "The Car Enthusiast's Quest",
    message: "Uncover the sacred grounds where JDM dreams come true. Follow the trail of orange signs to automotive paradise."
  },
  {
    title: "Island Paradise",
    message: "Return to the crystal waters where five kayaks carved memories. Decode the coordinates to our island sanctuary."
  },
  {
    title: "Memory Markers",
    message: "Each cipher contains references that only Divine members would understand. Use our shared experiences to guide you through the challenges."
  },
  {
    title: "Divine Guidance",
    message: "If you find yourself lost in memories, hints are available to light your path. Each hint draws from our actual adventures and inside jokes."
  }
];

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  introStep: initialStep = 0,
  onNextMessage = () => {},
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(initialStep);

  const handleNextStep = () => {
    if (currentStep >= introMessages.length - 1) {
      sessionStorage.setItem('hasSeenIntro', 'true');
      navigate('/home');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white flex items-center justify-center px-4"
    >
      {currentStep === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-serif mb-2">DIVINE</h1>
            <p className="text-2xl text-white/80 font-light mb-2">ディバイン</p>
            <h2 className="text-3xl font-serif text-white/90">Secret Santa Cipher</h2>
            <p className="text-xl text-white/70 mt-4">A Mystical Quest for Treasure</p>
            <div className="flex justify-center space-x-2 text-white/60 text-lg mt-4">
              <span>Decode</span>
              <span>•</span>
              <span>Discover</span>
              <span>•</span>
              <span>Unlock</span>
            </div>
          </div>

          <div className="text-white/40 text-lg space-x-2">
            <span>Divine Trials</span>
            <span>•</span>
            <span>Sacred Keys</span>
            <span>•</span>
            <span>Hidden Treasure</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.button
              onClick={handleNextStep}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Begin Quest
            </motion.button>
            <motion.button
              onClick={() => navigate('/guide')}
              className="px-8 py-3 bg-transparent hover:bg-white/5 text-white/70 rounded-lg border border-white/20 transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Cipher Guide
            </motion.button>
          </div>
        </motion.div>
      )}

      {currentStep > 0 && currentStep <= introMessages.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-serif mb-2">
            {introMessages[currentStep - 1].title}
          </h2>
          <p className="text-lg text-white/80">
            {introMessages[currentStep - 1].message}
          </p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleNextStep}
            className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90"
          >
            {currentStep === introMessages.length ? "Begin Quest" : "Continue"}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};