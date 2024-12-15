export const DIVINE_CIPHER_MAP: { [key: string]: string } = {
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

export const GAME_LEVELS = [
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