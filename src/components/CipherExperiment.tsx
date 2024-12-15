import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { CipherLevel } from './CipherLevel';
import { AICipherAssistant } from './AICipherAssistant';
import { KeyCombiner } from './KeyCombiner';

const DIVINE_CIPHER_MAP = {
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

  const isAllTrialsComplete = solvedLevels.length === GAME_LEVELS.length;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <AICipherAssistant 
          currentLevel={currentLevel}
          currentHint={message}
        />

        {GAME_LEVELS.map((level, index) => (
          <CipherLevel
            key={level.id}
            level={level}
            isCurrentLevel={level.id === currentLevel}
            isSolved={solvedLevels.includes(level.id)}
            isLocked={level.id > currentLevel}
            inputText={level.id === currentLevel ? inputText : ''}
            message={message}
            onInputChange={setInputText}
            onCheckSolution={checkSolution}
            onShowHint={showHint}
            revealedKey={revealedKeys[index]}
          />
        ))}

        <KeyCombiner 
          revealedKeys={revealedKeys}
          isComplete={isAllTrialsComplete}
        />

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
    </div>
  );
};
