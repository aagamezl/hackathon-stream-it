# Tile Quest Game

A tile-based game built with JavaScript and Vite.

## Project Setup

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

- `src/` - Source code directory
  - `game.js` - Main game logic
  - `loader.js` - Asset loading utilities
  - `camera.js` - Camera implementation
  - `grid.js` - Grid system
  - `hero.js` - Hero character implementation
  - `input.js` - Input handling
- `assets/` - Game assets (images, etc.)
- `index.html` - Main HTML file
- `vite.config.js` - Vite configuration

## Asset Loading

Images should be placed in the `assets` directory. The loader will automatically handle loading these assets using Vite's asset handling system.

## Dependencies

- Vite
- Canvas (for image handling)

## Development Notes

- Ensure all image paths in the code use relative paths from the assets directory
- Use the loader utility to load images for proper asset handling
- The game uses a tile-based system for rendering and movement
