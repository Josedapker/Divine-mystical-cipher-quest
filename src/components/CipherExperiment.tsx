import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface CipherExperimentProps {
  onBack: () => void;
}

export const CipherExperiment: React.FC<CipherExperimentProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-8 text-white/70 hover:text-white"
        >
          ← Back to Home
        </Button>
        
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-serif">Divine Cipher Challenge</h2>
          <p className="text-lg text-white/80">
            Coming soon: Decode mystical messages and unlock divine rewards...
          </p>
        </div>
      </motion.div>
    </div>
  );
};