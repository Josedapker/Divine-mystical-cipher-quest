import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CipherExperiment } from '../components/CipherExperiment';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <CipherExperiment onBack={() => setGameStarted(false)} />;
  }

  return (
    <div className="mystical-bg min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-divine-gold to-divine-purple">
          Divine Secret Santa
        </h1>
        
        <div className="animate-float mb-8 text-2xl space-x-2">
          {['◈', '◇', '○', '□', '△'].map((symbol, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="inline-block text-divine-purple"
            >
              {symbol}
            </motion.span>
          ))}
        </div>

        <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed">
          Embark on a mystical journey to unlock the sacred holiday cipher.
          Decode ancient symbols, reveal hidden messages, and discover the
          true spirit of giving within the Divine realm.
        </p>

        <motion.button
          onClick={() => setGameStarted(true)}
          className="px-8 py-4 bg-gradient-to-r from-divine-purple to-divine-gold 
                     text-white rounded-lg font-medium text-lg shadow-lg 
                     hover:shadow-divine-purple/50 transition-all duration-300
                     hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter the Divine Realm
        </motion.button>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              symbol: "◈",
              title: "Sacred Ciphers",
              description: "Decode mystical messages using divine symbols"
            },
            {
              symbol: "○",
              title: "Holiday Magic",
              description: "Experience the joy of giving in a magical way"
            },
            {
              symbol: "△",
              title: "Divine Rewards",
              description: "Unlock special treasures as you progress"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="divine-gradient p-6 rounded-lg backdrop-blur-sm"
            >
              <div className="text-3xl text-divine-gold mb-4 animate-glow">
                {feature.symbol}
              </div>
              <h3 className="text-xl font-serif mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;