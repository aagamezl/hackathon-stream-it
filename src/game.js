import { DIRECTIONS } from "./input.js";
import { createHero } from "./hero.js";
import { createCamera } from "./camera.js";
import { ImageLoader } from "./image-loader.js";
import { KEYBOARD } from "./input.js";
import { IS_SOLID_TILE } from "./grid.js";

export const DIRECTIONS_MAP = {
  [DIRECTIONS.DOWN]: 0,
  [DIRECTIONS.LEFT]: 1,
  [DIRECTIONS.RIGHT]: 2,
  [DIRECTIONS.UP]: 3,
};

export const createGame = (ctx, grid, keyboard) => {
  const state = {
    ctx,
    tileAtlas: null,
    heroImage: null,
    grid,
    keyboard,
    camera: null,
    hero: null,
    heroSpeed: 256,
    previousTime: 0,
    debug: false,
  };

  const drawGrid = () => {
    if (!state.debug) {
      return;
    }

    const camera = state.camera;
    const grid = state.grid;
    const tileSize = grid.tileSize;

    const cameraX = camera.x;
    const cameraY = camera.y;
    const cameraWidth = camera.width;
    const cameraHeight = camera.height;

    const startColumn = Math.floor(cameraX / tileSize);
    const startRow = Math.floor(cameraY / tileSize);
    const endColumn = Math.floor((cameraX + cameraWidth) / tileSize);
    const endRow = Math.floor((cameraY + cameraHeight) / tileSize);

    const offsetX = -cameraX + startColumn * tileSize;
    const offsetY = -cameraY + startRow * tileSize;

    const columnsVisible = endColumn - startColumn + 1;
    const rowsVisible = endRow - startRow + 1;
    const visibleWidthPixels = columnsVisible * tileSize;
    const visibleHeightPixel = rowsVisible * tileSize;

    const ctx = state.ctx;

    ctx.save();
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();

    // vertical lines
    for (let verticalLine = 0; verticalLine <= columnsVisible; verticalLine++) {
      const x = Math.round(offsetX + verticalLine * tileSize);

      ctx.moveTo(x, Math.round(offsetY));
      ctx.lineTo(x, Math.round(offsetY + visibleHeightPixel));
    }

    // horizontal lines
    for (let horizontalLine = 0; horizontalLine <= rowsVisible; horizontalLine++) {
      const y = Math.round(offsetY + horizontalLine * tileSize);

      ctx.moveTo(Math.round(offsetX), y);
      ctx.lineTo(Math.round(offsetX + visibleWidthPixels), y);
    }

    ctx.stroke();
    ctx.restore();
  };

  const drawLayer = (layer) => {
    // Cache frequently used values for performance and clarity
    const camera = state.camera;
    const grid = state.grid;
    const tileSize = grid.tileSize;
    const cameraX = camera.x;
    const cameraY = camera.y;
    const cameraWidth = camera.width;
    const cameraHeight = camera.height;
    const startColumn = Math.floor(cameraX / tileSize);
    const startRow = Math.floor(cameraY / tileSize);
    const endColumn = Math.floor((cameraX + cameraWidth) / tileSize);
    const endRow = Math.floor((cameraY + cameraHeight) / tileSize);
    const offsetX = -cameraX + startColumn * tileSize;
    const offsetY = -cameraY + startRow * tileSize;

    const drawCtx = state.ctx;
    const atlas = state.tileAtlas;

    for (let c = startColumn; c <= endColumn; c++) {
      for (let r = startRow; r <= endRow; r++) {
        const tile = grid.getTile(layer, c, r);

        // skip empty tiles quickly
        if (!tile) {
          continue;
        }

        const x = (c - startColumn) * tileSize + offsetX;
        const y = (r - startRow) * tileSize + offsetY;

        drawCtx.drawImage(
          atlas,
          (tile - 1) * tileSize,
          0,
          tileSize,
          tileSize,
          Math.round(x),
          Math.round(y),
          tileSize,
          tileSize
        );

        // Optional: draw debug collision boxes only when enabled
        if (state.debug && IS_SOLID_TILE.includes(tile)) {
          drawCtx.strokeRect(Math.round(x), Math.round(y), tileSize, tileSize);
        }
      }
    }
  };

  /**
   *
   * @param {number} currentTime
   */
  const tick = (currentTime) => {
    window.requestAnimationFrame(tick);

    // clear previous frame
    state.ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    const delta = Math.min((currentTime - state.previousTime) / 1000.0, 0.25); // maximum delta of 250 ms
    state.previousTime = currentTime;

    update(delta);
    render();
  };

  const render = () => {
    // draw map background layer
    drawLayer(0);

    const directionIndex = DIRECTIONS_MAP[state.hero.direction];
    // Each direction has 3 frames (0 for standing, 1-2 for walking)
    const frameX = state.hero.frame * state.hero.width;
    const frameY = directionIndex * state.hero.height;

    state.ctx.drawImage(
      state.hero.image,
      frameX,
      frameY,
      state.hero.width,
      state.hero.height,
      Math.round(state.hero.screenX - state.hero.width / 2),
      Math.round(state.hero.screenY - state.hero.height / 2),
      state.hero.width,
      state.hero.height
    );

    // draw hero collision box
    if (state.debug) {
      state.ctx.strokeRect(
        Math.round(state.hero.x - state.hero.width / 2 - state.camera.x),
        Math.round(state.hero.y - state.hero.height / 2 - state.camera.y),
        state.hero.width,
        state.hero.height
      );
    }

    // draw map top layer
    drawLayer(1);

    // draw grid lines in debug mode
    drawGrid();
  };

  const update = (delta) => {
    // handle hero movement with arrow keys
    let directionX = 0;
    let directionY = 0;

    if (state.keyboard.isDown(KEYBOARD.LEFT)) {
      directionX = -1;
    } else if (state.keyboard.isDown(KEYBOARD.RIGHT)) {
      directionX = 1;
    } else if (state.keyboard.isDown(KEYBOARD.UP)) {
      directionY = -1;
    } else if (state.keyboard.isDown(KEYBOARD.DOWN)) {
      directionY = 1;
    }

    // Update hero
    state.hero.move(delta, directionX, directionY);

    // Update camera
    const { screenX, screenY } = state.camera.update();

    state.hero.screenX = screenX;
    state.hero.screenY = screenY;

    // Toggle debug mode on SPACE press (rising edge) so a single press
    // flips the mode instead of toggling every frame while held.
    // const spaceDown = !!state.keyboard.isDown(KEYBOARD.SPACE)
    // if (spaceDown && !state.spaceWasDown) {
    //   state.debug = !state.debug
    // }
    // state.spaceWasDown = spaceDown

    return state;
  };

  return {
    state,
    run: () => {
      state.keyboard.listen();

      state.hero = createHero(state.grid, 160, 160);
      state.camera = createCamera(state.grid, 512, 512);

      state.camera.follow(state.hero);

      window.requestAnimationFrame(tick);
    },
    loadAssets: () => {
      return Promise.all([
        ImageLoader.loadImage("tiles", "../assets/tileset.png"),
        ImageLoader.loadImage("hero", "../assets/mark.png"),
      ]).then(([tiles, hero]) => {
        state.tileAtlas = tiles;
        state.heroImage = hero;

        return state;
      });
    },
  };
};
