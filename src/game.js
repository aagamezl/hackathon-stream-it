import { createCamera } from './camera.js'
import { IS_SOLID_TILE } from './grid.js'
import { createHero } from './hero.js'
import { KEYBOARD } from './input.js'
import { Loader } from './loader.js'

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
    previousTime: 0
  }

  const drawLayer = (layer) => {
    const startCol = Math.floor(state.camera.x / state.grid.tsize)
    const endCol = startCol + (state.camera.width / state.grid.tsize)
    const startRow = Math.floor(state.camera.y / state.grid.tsize)
    const endRow = startRow + (state.camera.height / state.grid.tsize)
    const offsetX = -state.camera.x + startCol * state.grid.tsize
    const offsetY = -state.camera.y + startRow * state.grid.tsize

    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        const tile = state.grid.getTile(layer, c, r)
        const x = (c - startCol) * state.grid.tsize + offsetX
        const y = (r - startRow) * state.grid.tsize + offsetY

        if (tile !== 0) { // 0 => empty tile
          state.ctx.drawImage(
            state.tileAtlas, // image
            (tile - 1) * state.grid.tsize, // source x
            0, // source y
            state.grid.tsize, // source width
            state.grid.tsize, // source height
            Math.round(x), // target x
            Math.round(y), // target y
            state.grid.tsize, // target width
            state.grid.tsize // target height
          )

          // draw solid tiles collision box
          if (IS_SOLID_TILE.includes(tile)) {
            ctx.strokeRect(
              x,
              y,
              state.grid.tsize,
              state.grid.tsize
            )
          }
        }
      }
    }
  }

  const tick = (currentTime) => {
    window.requestAnimationFrame(tick)

    // clear previous frame
    ctx.clearRect(0, 0, 512, 512)

    // compute delta time in seconds -- also cap it
    const delta = Math.min((currentTime - state.previousTime) / 1000.0, 0.25) // maximum delta of 250 ms
    state.previousTime = currentTime

    update(delta)
    render()
  }

  const render = () => {
    // draw map background layer
    drawLayer(0)

    // draw main character with animation
    const directionMap = {
      front: 0,
      left: 1,
      right: 2,
      back: 3
    }

    const directionIndex = directionMap[state.hero.direction]
    // Each direction has 3 frames (0 for standing, 1-2 for walking)
    const frameX = state.hero.frame * state.hero.width
    const frameY = directionIndex * state.hero.height

    state.ctx.drawImage(
      state.hero.image,
      frameX, frameY, // source x, y
      state.hero.width, state.hero.height, // source width, height
      state.hero.screenX - state.hero.width / 2,
      state.hero.screenY - state.hero.height / 2,
      state.hero.width, state.hero.height
    )

    // draw hero collision box
    ctx.strokeRect(
      state.hero.x - state.hero.width / 2 - state.camera.x,
      state.hero.y - state.hero.height / 2 - state.camera.y,
      state.hero.width,
      state.hero.height
    )

    // draw map top layer
    drawLayer(1)

    // draw grid
    // drawGrid();
  }

  const update = (delta) => {
    // handle hero movement with arrow keys
    let dirx = 0
    let diry = 0

    if (state.keyboard.isDown(KEYBOARD.LEFT)) {
      dirx = -1
    } else if (state.keyboard.isDown(KEYBOARD.RIGHT)) {
      dirx = 1
    } else if (state.keyboard.isDown(KEYBOARD.UP)) {
      diry = -1
    } else if (state.keyboard.isDown(KEYBOARD.DOWN)) {
      diry = 1
    }

    // Update hero
    state.hero.move(delta, dirx, diry)

    // Update camera
    const { screenX, screenY } = state.camera.update()

    state.hero.screenX = screenX
    state.hero.screenY = screenY

    return state
  }

  return {
    state,
    run: () => {
      state.keyboard.listen()

      state.hero = createHero(state.grid, 160, 160)
      state.camera = createCamera(state.grid, 512, 512)

      state.camera.follow(state.hero)

      window.requestAnimationFrame(tick)
    },
    loadAssets: () => {
      return Promise.all([
        Loader.loadImage('tiles', './../assets/tileset.png'),
        Loader.loadImage('hero', './../assets/mark.png')
      ]).then(([tiles, hero]) => {
        state.tileAtlas = tiles
        state.heroImage = hero

        return state
      })
    }
  }
}
