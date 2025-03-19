# Word Guessing Game
[Play here (Desktop only)](https://vaddshah-guessing-game.netlify.app/)) 

A simple and fun word guessing game built with React, TypeScript, and Vite.

## Description

This Word Guessing Game is a web-based application where players attempt to guess a randomly selected five-letter word. The game provides feedback on each guess, helping players deduce the correct word.

## Features

- Randomly generated five-letter word for each game
- Interactive grid to display guesses and provide feedback
- Real-time input for guesses
- Visual feedback on letter correctness:
  - Green: Correct letter in the correct position
  - Yellow: Correct letter in the wrong position
  - Gray: Letter not in the word
- Reset functionality to start a new game
- Responsive design for various screen sizes

## How to Play

1. The game starts with a randomly selected five-letter word.
2. Type your guess using your keyboard. The current guess is displayed at the bottom.
3. Press Enter to submit your guess.
4. The grid will update to show the correctness of each letter in your guess.
5. You have five attempts to guess the word correctly.
6. If you guess the word or use all attempts, you can reset the game to play again.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS

## Setup and Installation

1. Clone the repository:

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
