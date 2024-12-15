import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { HelpCircle } from 'lucide-react';
import { CipherLevel } from './CipherLevel';
import { AICipherAssistant } from './AICipherAssistant';
import { KeyCombiner } from './KeyCombiner';
import CipherGuide from './CipherGuide';
import { GAME_LEVELS } from './CipherConstants';
import { checkSolution, showHint, fetchWalletBalance } from './GameLogic';

interface CipherExperimentProps {
  onBack: () => void;
}

export const CipherExperiment: React.FC<CipherExperimentProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);
  const [solvedLevels, setSolvedLevels] = useState<number[]>([]);
  const [showRules, setShowRules] = useState(false);

  const handleCheckSolution = () => {
    checkSolution(
      inputText,
      currentLevel,
      GAME_LEVELS,
      revealedKeys,
      solvedLevels,
      {
        setRevealedKeys,
        setSolvedLevels,
        setMessage,
        setCurrentLevel,
        setInputText,
      }
    );
  };

  const handleShowHint = () => {
    showHint(currentLevel, GAME_LEVELS, solvedLevels, message, setMessage);
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const isAllTrialsComplete = solvedLevels.length === GAME_LEVELS.length;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowRules(true)}
          className="rounded-full bg-white/10 hover:bg-white/20"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

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
            onCheckSolution={handleCheckSolution}
            onShowHint={handleShowHint}
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

      <CipherGuide
        open={showRules}
        onOpenChange={setShowRules}
      />
    </div>
  );
};