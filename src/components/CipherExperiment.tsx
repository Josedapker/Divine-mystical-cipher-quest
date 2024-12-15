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
    reward: "First part of the key: jqTnERPoRvZR",
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
    reward: "Second part of the key: 5T6BiPF1QyChub5fh3U7g8uWeDMENabtvuYDje3hAR3xpaCsTpNQjX6hSYUNM",
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
    reward: "Final part of the key: 13mZ1f76VcanJm",
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
        setMessage('Congratulations! You have completed all trials! The complete key is: ' + 
          [...revealedKeys, level.reward].join(' '));
      }
    } else {
      setMessage('Incorrect solution. Try again!');
    }
  };

  const showHint = () => {
    const level = GAME_LEVELS[currentLevel - 1];
    const currentHintsUsed = solvedLevels.includes(currentLevel) ? 0 : 
      (level.hints.findIndex(hint => message === `Hint: ${hint}`) + 1) || 0;
    
    if (currentHintsUsed < level.hints.length) {
      setMessage(`Hint: ${level.hints[currentHintsUsed]}`);
    } else {
      setMessage("No more hints available for this level!");
    }
  };

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        const publicKey = new PublicKey('jqTnERPoRvZR5T6BiPF1QyChub5fh3U7g8uWeDMENabtvuYDje3hAR3xpaCsTpNQjX6hSYUNM');
        const balance = await connection.getBalance(publicKey);
        console.log('Wallet balance:', balance / LAMPORTS_PER_SOL);
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
            className="max-w-2xl mx-auto space-y-8"
          >
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="mb-8 text-white/70 hover:text-white"
            >
              ← Back to Home
            </Button>

            {/* Display all levels in sequence */}
            {GAME_LEVELS.map((level, index) => {
              const isCurrentLevel = level.id === currentLevel;
              const isSolved = solvedLevels.includes(level.id);
              const isLocked = level.id > currentLevel;

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-lg border ${
                    isCurrentLevel ? 'bg-white/10 border-white/20' :
                    isSolved ? 'bg-white/5 border-white/10' :
                    'bg-white/5 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-serif">Trial {level.id}</h3>
                    {isSolved && (
                      <span className="text-green-400 text-sm">Completed</span>
                    )}
                  </div>

                  {!isLocked && (
                    <>
                      <p className="text-white/80 mb-4">{level.hint}</p>
                      <div className="font-mono text-lg mb-4 bg-white/5 p-3 rounded text-center">
                        {level.encodedMessage}
                      </div>

                      {isCurrentLevel && (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                            placeholder="Enter your solution..."
                          />
                          <div className="flex gap-3">
                            <button
                              onClick={checkSolution}
                              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                            >
                              Submit Answer
                            </button>
                            <button
                              onClick={showHint}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded transition-colors"
                            >
                              Need a Hint?
                            </button>
                          </div>
                        </div>
                      )}

                      {isSolved && (
                        <div className="mt-4 p-3 bg-white/10 rounded">
                          <p className="text-green-400 mb-2">Reward Unlocked:</p>
                          <code className="text-sm break-all">
                            {revealedKeys[level.id - 1]}
                          </code>
                        </div>
                      )}
                    </>
                  )}

                  {isLocked && (
                    <div className="text-center py-8 text-white/40">
                      <p>Complete previous trials to unlock</p>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded bg-white/5 text-center"
              >
                {message}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
