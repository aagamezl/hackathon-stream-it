import { createGame } from "./game.js";
import { createKeyboard, KEYBOARD } from "./input.js";
import { createDefaultGrid } from "./grid.js";

// Initialize the game when the window loads
window.onload = () => {
  const canvas = document.getElementById("demo");
  const ctx = canvas.getContext("2d");
  const grid = createDefaultGrid();
  const keyboard = createKeyboard(Object.values(KEYBOARD));
  const game = createGame(ctx, grid, keyboard);

  // Load assets first
  game.loadAssets().then(() => {
    // Start the game loop after assets are loaded
    game.run();

    // Wire debug toggle (if present)
    const debugToggle = document.getElementById("debug-toggle");

    if (debugToggle) {
      // initialize from current state (default false)
      debugToggle.checked = !!game.state.debug;

      debugToggle.addEventListener("change", (e) => {
        game.state.debug = e.target.checked;
      });

      window.addEventListener("keydown", (event) => {
        if (event.code === KEYBOARD.SPACE) {
          game.state.debug = !game.state.debug;
          debugToggle.checked = game.state.debug;
        }
      });
    }
  });
};
