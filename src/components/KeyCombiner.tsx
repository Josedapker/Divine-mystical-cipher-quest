import React, { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface KeyCombinerProps {
  revealedKeys: string[];
  isComplete: boolean;
}

export const KeyCombiner: React.FC<KeyCombinerProps> = ({ revealedKeys, isComplete }) => {
  const [combinedKey, setCombinedKey] = useState('');
  const { toast } = useToast();

  const combineKeys = () => {
    // Extract just the key parts from the reward strings
    const keyParts = revealedKeys.map(reward => {
      const match = reward.match(/part of the key: (.+)$/);
      return match ? match[1].trim() : '';
    });
    
    const combined = keyParts.join('');
    setCombinedKey(combined);
    toast({
      title: "Keys Combined!",
      description: "The private key has been assembled. You can now copy it to your clipboard.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(combinedKey);
      toast({
        title: "Copied!",
        description: "The private key has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10"
    >
      <h3 className="text-xl font-serif mb-4 text-center">🎁 Divine Secret Santa Treasure</h3>
      <p className="text-white/70 text-center mb-6">
        All trials completed! Combine the key fragments to reveal the treasure.
      </p>
      
      {!combinedKey ? (
        <Button 
          onClick={combineKeys}
          className="w-full mb-4"
        >
          Combine Key Fragments
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-md">
            <p className="text-sm text-white/60 mb-2">Private Key:</p>
            <code className="text-sm break-all block">
              {combinedKey}
            </code>
          </div>
          <Button 
            onClick={copyToClipboard}
            className="w-full"
          >
            Copy to Clipboard
          </Button>
          <p className="text-sm text-white/60 text-center mt-4">
            Import this private key into your Phantom wallet to access the treasure!
          </p>
        </div>
      )}
    </motion.div>
  );
};