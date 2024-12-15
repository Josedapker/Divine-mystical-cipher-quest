import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const checkSolution = (
  inputText: string,
  currentLevel: number,
  GAME_LEVELS: any[],
  revealedKeys: string[],
  solvedLevels: number[],
  callbacks: {
    setRevealedKeys: (keys: string[]) => void;
    setSolvedLevels: (levels: number[]) => void;
    setMessage: (message: string) => void;
    setCurrentLevel: (level: number) => void;
    setInputText: (text: string) => void;
  }
) => {
  const level = GAME_LEVELS[currentLevel - 1];
  const normalizedInput = inputText.toUpperCase().replace(/\s+/g, '');
  const normalizedSolution = level.solution.toUpperCase().replace(/\s+/g, '');
  
  if (normalizedInput === normalizedSolution) {
    callbacks.setRevealedKeys([...revealedKeys, level.reward]);
    callbacks.setSolvedLevels([...solvedLevels, currentLevel]);
    callbacks.setMessage(`Correct! ${level.reward}`);
    if (currentLevel < GAME_LEVELS.length) {
      setTimeout(() => {
        callbacks.setCurrentLevel(currentLevel + 1);
        callbacks.setInputText('');
        callbacks.setMessage('');
      }, 2000);
    } else {
      callbacks.setMessage(
        'Congratulations! You have completed all trials! The complete key is: ' +
        [...revealedKeys, level.reward].join('')
      );
    }
  } else {
    callbacks.setMessage('Incorrect solution. Try again!');
  }
};

export const showHint = (
  currentLevel: number,
  GAME_LEVELS: any[],
  solvedLevels: number[],
  message: string,
  setMessage: (message: string) => void
) => {
  const level = GAME_LEVELS[currentLevel - 1];
  const currentHintsUsed = solvedLevels.includes(currentLevel)
    ? 0
    : level.hints.findIndex(hint => message === `Hint: ${hint}`) + 1 || 0;

  if (currentHintsUsed < level.hints.length) {
    setMessage(`Hint: ${level.hints[currentHintsUsed]}`);
  } else {
    setMessage("No more hints available for this level!");
  }
};

export const fetchWalletBalance = async () => {
  try {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const publicKey = new PublicKey('jqTnERPoRvZR5T6BiPF1QyChub5fh3U7g8uWeDMENabtvuYDje3hAR3xpaCsTpNQjX6hSYUNM');
    const balance = await connection.getBalance(publicKey);
    console.log('Wallet balance:', balance / LAMPORTS_PER_SOL);
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
  }
};