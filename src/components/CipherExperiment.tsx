import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const DIVINE_CIPHER_MAP: { [key: string]: string } = {
  'A': '◈', 'B': '◇', 'C': '○', 'D': '□', 'E': '△',
  'F': '▽', 'G': '☆', 'H': '◎', 'I': '◉', 'J': '◍',
  'K': '◐', 'L': '◑', 'M': '◒', 'N': '◓', 'O': '◔',
  'P': '◕', 'Q': '⚉', 'R': '⚇', 'S': '⚆', 'T': '⚈',
  'U': '✧', 'V': '✦', 'W': '❖', 'X': '✵', 'Y': '❈',
  'Z': '✴', ' ': '⟡', '.': '⟢', ',': '⟣', '!': '⟤',
  '?': '⟥', '0': '⎔', '1': '⎊', '2': '⎈', '3': '⎇',
  '4': '⌬', '5': '⌭', '6': '⌮', '7': '⌯', '8': '⌰',
  '9': '⌱'
};

const REVERSE_CIPHER_MAP = Object.fromEntries(
  Object.entries(DIVINE_CIPHER_MAP).map(([k, v]) => [v, k])
);

const GAME_LEVELS = [
  {
    id: 1,
    hint: "First test: Decode this message to prove your worth",
    encodedMessage: "⎊⎈⎇⌬⌭⌮⌯⌰⌱⎔", // "1234567890"
    solution: "1234567890",
    reward: "First part of the key: 5KF",
    hints: [
      "Look at the pattern of symbols carefully",
      "Each symbol represents a single digit",
      "The sequence starts with ⎊ which represents 1"
    ]
  },
  {
    id: 2,
    hint: "Second test: What has keys but no locks, space but no room, and you can enter but not go in?",
    encodedMessage: "◐△❈◇◔◈⚇□", // "KEYBOARD"
    solution: "KEYBOARD",
    reward: "Second part of the key: 9HJ",
    hints: [
      "It's something you use every day",
      "You're using it right now to solve this puzzle",
      "Type your answer on it"
    ]
  },
  {
    id: 3,
    hint: "Final test: Decode this wallet address",
    encodedMessage: "⚆◔◑◈◓◈", // "SOLANA"
    solution: "SOLANA",
    reward: "Final part of the key: 2MP",
    hints: [
      "It's the name of a blockchain",
      "This treasure hunt runs on it",
      "SOL is its native token"
    ]
  }
];

interface CipherExperimentProps {
  onBack: () => void;
}

export const CipherExperiment: React.FC<CipherExperimentProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [hintsUsed, setHintsUsed] = useState<{ [key: number]: number }>({});
  const [rewardMultiplier, setRewardMultiplier] = useState(1.0);
  const [solvedLevels, setSolvedLevels] = useState<number[]>([]);
  const [introStep, setIntroStep] = useState(0);
  const [showGame, setShowGame] = useState(false);

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

  const handleNextMessage = () => {
    if (introStep < introMessages.length) {
      setIntroStep(prev => prev + 1);
    } else {
      setShowGame(true);
    }
  };

  const checkSolution = () => {
    const level = GAME_LEVELS[currentLevel - 1];
    if (inputText.toUpperCase() === level.solution) {
      setRevealedKeys([...revealedKeys, level.reward]);
      setSolvedLevels([...solvedLevels, currentLevel]);
      setMessage(`Correct! ${level.reward}`);
      if (currentLevel < GAME_LEVELS.length) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setInputText('');
          setMessage('');
        }, 2000);
      } else {
        setMessage('Congratulations! You have completed all levels! The complete key is: ' + 
          [...revealedKeys, level.reward].join(' '));
      }
    } else {
      setMessage('Incorrect solution. Try again!');
    }
  };

  const showHint = () => {
    const level = GAME_LEVELS[currentLevel - 1];
    const currentHintsUsed = hintsUsed[currentLevel] || 0;
    
    if (currentHintsUsed < level.hints.length) {
      setHintsUsed({
        ...hintsUsed,
        [currentLevel]: currentHintsUsed + 1
      });
      setRewardMultiplier(Math.max(0.25, rewardMultiplier - 0.25));
      setMessage(`Hint ${currentHintsUsed + 1}: ${level.hints[currentHintsUsed]}`);
    } else {
      setMessage("No more hints available for this level!");
    }
  };

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const publicKey = new PublicKey('Your-Public-Key-Here');
        const balance = await connection.getBalance(publicKey);
        setWalletBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    fetchWalletBalance();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <AnimatePresence mode="wait">
        {!showGame ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto mt-20"
          >
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="mb-8 text-white/70 hover:text-white"
            >
              ← Back to Home
            </Button>

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
                  {introStep === introMessages.length ? "Begin Quest" : "Continue"}
                </motion.button>
              </motion.div>
            )}

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
          </motion.div>
        ) : (
          <motion.div
            key="game"
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

            {/* Show Collected Key Fragments */}
            {solvedLevels.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-serif">Secret Santa Key Collection</h2>
                  <span className="text-xs text-white/50">{solvedLevels.length}/3 Fragments Found</span>
                </div>
                <div className="space-y-2">
                  {solvedLevels.map((level) => (
                    <div key={level} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                        {level}
                      </div>
                      <code className="flex-1 text-sm font-mono text-white/90">
                        {revealedKeys[level - 1]}
                      </code>
                    </div>
                  ))}
                </div>
                {solvedLevels.length === GAME_LEVELS.length && (
                  <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded">
                    <div className="text-sm font-serif mb-1">🎁 Secret Santa's Gift Unlocked!</div>
                    <code className="block text-sm font-mono break-all text-white/90">
                      {revealedKeys.join(' ')}
                    </code>
                  </div>
                )}
              </motion.div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-serif">Holiday Cipher {currentLevel}</h2>
                <div className="text-xs text-white/50">
                  Holiday Spirit: {(rewardMultiplier * 100).toFixed(0)}%
                </div>
              </div>
              
              <div className="font-mono text-lg mb-4 bg-white/5 p-3 rounded text-center">
                {GAME_LEVELS[currentLevel - 1].encodedMessage}
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="text-sm text-white/60">
                  Divine Hints: {hintsUsed[currentLevel] || 0}/3
                </div>
                <button
                  onClick={showHint}
                  className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 rounded transition-colors"
                  disabled={(hintsUsed[currentLevel] || 0) >= 3}
                >
                  Seek Guidance
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                  placeholder="Decode the holiday message..."
                />
                <button
                  onClick={checkSolution}
                  className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                >
                  Reveal This Fragment
                </button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 rounded text-sm bg-white/5"
                >
                  {message}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};