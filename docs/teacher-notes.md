# Teacher Notes — Answers and Hints

This file contains brief answers to the student TODOs and common hints.

Hero speed TODO (src/hero.js)
- Suggested solution:

```javascript
export const DEFAULT_HERO_SPEED = 128

// later in createHero
speed: DEFAULT_HERO_SPEED,
```

SPACE key TODO (src/input.js)
- Add to `KEYBOARD`:

```javascript
SPACE: 32
```

- To avoid toggling many times per press (debounce), detect the rising edge:

```javascript
// inside update loop
if (keyboard.isDown(KEYBOARD.SPACE) && !state.spaceWasDown) {
  state.debug = !state.debug
}
state.spaceWasDown = keyboard.isDown(KEYBOARD.SPACE)
```

Grid opacity TODO (src/game.js)
- Try values such as `0.05`, `0.15` (default), or `0.35` and show the visual effect.

Common student issues
- "Nothing changed" — remind them to save files and reload the page or restart `vite` dev server.
- Off-by-one errors with tile indexing — explain `row * cols + col` again.

Running the project

```bash
npm install
npm run dev    # development server
npm run build  # create dist
```
