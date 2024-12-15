import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CipherExperiment } from '../components/CipherExperiment';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <CipherExperiment onBack={() => setGameStarted(false)} />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif text-white mb-2"
        >
          DIVINE
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/60 font-light mb-8 tracking-[0.2em]"
        >
          神聖な
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="max-w-xl mx-auto mb-12"
        >
          <h3 className="text-xl md:text-2xl text-white/80 font-light mb-6">
            Agent Swarm Intelligence
          </h3>
          <p className="text-white/60 text-sm md:text-base mb-8">
            Automated Trading • Market Analysis • Prediction Markets
          </p>
          <div className="text-white/40 text-sm space-y-1">
            <p>Divine Oracle • Divine Sentinel • Divine Prophet</p>
            <p>Divine Trader • Divine Pulse</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            onClick={() => setGameStarted(true)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white/90 rounded-full 
                     border border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Request Access
          </motion.button>
          
          <motion.button
            onClick={() => setGameStarted(true)}
            className="px-6 py-2 bg-transparent hover:bg-white/5 text-white/70 rounded-full 
                     border border-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Experiments
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;