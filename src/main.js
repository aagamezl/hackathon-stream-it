import { createGame } from './game.js';
import { createDefaultGrid } from './grid.js';
import { createKeyboard, KEYBOARD } from './input.js';

// Initialize the game when the window loads
window.onload = () => {
  const canvas = document.getElementById('demo');
  const ctx = canvas.getContext('2d');
  const grid = createDefaultGrid();
  const keyboard = createKeyboard(Object.values(KEYBOARD));
  const game = createGame(ctx, grid, keyboard);

  // Load assets first
  game.loadAssets().then(() => {
    // Start the game loop after assets are loaded
    game.run();
  });
};
