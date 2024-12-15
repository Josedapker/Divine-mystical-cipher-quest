import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const introMessages = [
  {
    title: "The Divine Secret Santa",
    message: "Welcome to a mystical holiday quest where DIVINE members unite to unlock a special treasure for one of our own..."
  },
  {
    title: "A Gift Most Sacred",
    message: "The Secret Santa's treasure lies hidden behind three mystical ciphers, waiting to bring joy to our chosen DIVINE member."
  },
  {
    title: "Our Collective Mission",
    message: "Together, we must decode these enchanted messages to reveal the key fragments. Only through our combined wisdom will the gift be unveiled."
  },
  {
    title: "The Oracle's Blessing",
    message: "I shall guide our fellowship through this festive challenge. Seek my hints if needed, though each one slightly dims the holiday magic."
  },
  {
    title: "Unite for Joy",
    message: "Are you ready to join your fellow DIVINE members in this magical Secret Santa quest? Let's bring holiday wonder to our chosen one..."
  }
];

const IntroSequence = () => {
  const [introStep, setIntroStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset hasSeenIntro when component mounts
    sessionStorage.removeItem('hasSeenIntro');
  }, []);

  const handleNextMessage = () => {
    if (introStep < introMessages.length) {
      setIntroStep(prev => prev + 1);
    } else {
      sessionStorage.setItem('hasSeenIntro', 'true');
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 mystical-bg" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-2xl mx-auto mt-20"
        >
          {introStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.button
                onClick={handleNextMessage}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90 text-lg"
              >
                Enter the Divine Realm
              </motion.button>
            </motion.div>
          )}

          {introStep > 0 && introStep <= introMessages.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <h2 className="text-2xl font-serif mb-2">{introMessages[introStep - 1].title}</h2>
              <p className="text-lg text-white/80">{introMessages[introStep - 1].message}</p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleNextMessage}
                className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90"
              >
                {introStep === introMessages.length ? "Enter Home" : "Continue"}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IntroSequence;