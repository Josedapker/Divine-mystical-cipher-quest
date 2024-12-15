import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface CipherLevelProps {
  level: {
    id: number;
    hint: string;
    encodedMessage: string;
    solution: string;
    reward: string;
    hints: string[];
  };
  isCurrentLevel: boolean;
  isSolved: boolean;
  isLocked: boolean;
  inputText: string;
  message: string;
  onInputChange: (value: string) => void;
  onCheckSolution: () => void;
  onShowHint: () => void;
  revealedKey?: string;
}

export const CipherLevel: React.FC<CipherLevelProps> = ({
  level,
  isCurrentLevel,
  isSolved,
  isLocked,
  inputText,
  message,
  onInputChange,
  onCheckSolution,
  onShowHint,
  revealedKey,
}) => {
  return (
    <motion.div
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
                onChange={(e) => onInputChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                placeholder="Enter your solution..."
              />
              <div className="flex gap-3">
                <Button
                  onClick={onCheckSolution}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors"
                >
                  Submit Answer
                </Button>
                <Button
                  onClick={onShowHint}
                  variant="outline"
                  className="px-4 py-2"
                >
                  Need a Hint?
                </Button>
              </div>
            </div>
          )}

          {isSolved && revealedKey && (
            <div className="mt-4 p-3 bg-white/10 rounded">
              <p className="text-green-400 mb-2">Reward Unlocked:</p>
              <code className="text-sm break-all">
                {revealedKey}
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
};