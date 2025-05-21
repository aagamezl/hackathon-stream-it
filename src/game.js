import { createCamera } from './camera.js';
import { createHero } from './hero.js';
import { KEYBOARD } from './input.js';
import { Loader } from './loader.js';

/** @typedef {import('./grid.js').Grid} Grid */
/** @typedef {import('./input.js').Keyboard} Keyboard */


/** @typedef {Object} Hero
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Image} image
 */

/** @typedef {Object} Camera
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {number} maxX
 * @property {number} maxY
 * @property {Hero} following
 */

/** @typedef {Object} GameState
 * @property {CanvasRenderingContext2D} ctx
 * @property {Image} tileAtlas
 * @property {Image} heroImage
 * @property {Grid} grid
 * @property {Keyboard} keyboard
 * @property {Object} camera
 * @property {Object} hero
 * @property {number} heroSpeed
 * @property {number} previousTime
 */

/** @typedef {Object} Game
 * @property {GameState} state
 * @property {() => void} run
 * @property {() => Promise<GameState>} loadAssets
 */

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Grid} grid 
 * @param {Keyboard} keyboard 
 * @returns {Game}
*/
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
  }

  const drawGrid = () => {
    const width = state.grid.cols * state.grid.tsize;
    const height = state.grid.rows * state.grid.tsize;
    let x, y;

    for (let r = 0; r < state.grid.rows; r++) {
      x = - state.camera.x;
      y = r * state.grid.tsize - state.camera.y;
      state.ctx.beginPath();
      state.ctx.moveTo(x, y);
      state.ctx.lineTo(width, y);
      state.ctx.stroke();
    }

    for (let c = 0; c < state.grid.cols; c++) {
      x = c * state.grid.tsize - state.camera.x;
      y = - state.camera.y;
      state.ctx.beginPath();
      state.ctx.moveTo(x, y);
      state.ctx.lineTo(x, height);
      state.ctx.stroke();
    }
  }

  const drawLayer = (layer) => {
    const startCol = Math.floor(state.camera.x / state.grid.tsize);
    const endCol = startCol + (state.camera.width / state.grid.tsize);
    const startRow = Math.floor(state.camera.y / state.grid.tsize);
    const endRow = startRow + (state.camera.height / state.grid.tsize);
    const offsetX = -state.camera.x + startCol * state.grid.tsize;
    const offsetY = -state.camera.y + startRow * state.grid.tsize;

    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        const tile = state.grid.getTile(layer, c, r);
        const x = (c - startCol) * state.grid.tsize + offsetX;
        const y = (r - startRow) * state.grid.tsize + offsetY;

        if (tile !== 0) { // 0 => empty tile
          state.ctx.drawImage(
            state.tileAtlas, // image
            (tile - 1) * state.grid.tsize, // source x
            0, // source y
            state.grid.tsize, // source width
            state.grid.tsize, // source height
            Math.round(x),  // target x
            Math.round(y), // target y
            state.grid.tsize, // target width
            state.grid.tsize // target height
          );
        }
      }
    }
  }

  const tick = (currentTime) => {
    window.requestAnimationFrame(tick);

    // clear previous frame
    ctx.clearRect(0, 0, 512, 512);

    // compute delta time in seconds -- also cap it
    const delta = Math.min((currentTime - state.previousTime) / 1000.0, 0.25); // maximum delta of 250 ms
    state.previousTime = currentTime;

    update(delta);
    render();
  };

  const render = () => {
    // draw map background layer
    drawLayer(0);

    // draw main character
    state.ctx.drawImage(
      state.hero.image,
      state.hero.screenX - state.hero.width / 2,
      state.hero.screenY - state.hero.height / 2);

    // draw map top layer
    drawLayer(1);

    // draw grid
    drawGrid();
  }

  const update = (delta) => {
    // handle hero movement with arrow keys
    let dirx = 0;
    let diry = 0;

    if (state.keyboard.isDown(KEYBOARD.LEFT)) {
      dirx = -1;
    } else if (state.keyboard.isDown(KEYBOARD.RIGHT)) {
      dirx = 1;
    } else if (state.keyboard.isDown(KEYBOARD.UP)) {
      diry = -1;
    } else if (state.keyboard.isDown(KEYBOARD.DOWN)) {
      diry = 1;
    }

    // Update hero
    state.hero.move(delta, dirx, diry);
    // state.hero.x = x;
    // state.hero.y = y;

    // Update camera
    const { /* x: cameraX, y: cameraY,  */screenX, screenY } = state.camera.update();

    // state.camera.x = cameraX;
    // state.camera.y = cameraY;
    state.hero.screenX = screenX;
    state.hero.screenY = screenY;

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
        Loader.loadImage('tiles', '../assets/tiles.png'),
        Loader.loadImage('hero', '../assets/character.png')
      ]).then(([tiles, hero]) => {
        state.tileAtlas = tiles;
        state.heroImage = hero;

        return state;
      });
    }
  };
};
