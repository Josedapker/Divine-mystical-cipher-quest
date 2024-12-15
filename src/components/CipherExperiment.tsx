import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IntroSequence } from './IntroSequence';
import { CipherLevel } from './CipherLevel';
import { AICipherAssistant } from './AICipherAssistant';
import { GAME_LEVELS } from '../constants/gameConstants';

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

  const handleNextMessage = () => {
    if (introStep < 5) {
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

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <AnimatePresence mode="wait">
        {!showGame ? (
          <IntroSequence 
            introStep={introStep}
            onNextMessage={handleNextMessage}
            onBack={onBack}
          />
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
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

            {message && (
              <div className="p-4 rounded bg-white/5 text-center">
                {message}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};