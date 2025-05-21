import { Loader } from "./loader.js"

// Hero functionality
export const createHero = (map, x, y) => {
  // Hero state
  const hero = {
    map,
    x,
    y,
    width: 32, // Each sprite frame is 64x 64 pixels
    height: 64,
    image: Loader.getImage('hero'),
    speed: 128,
    direction: 'front', // front, left, right, back
    frame: 0, // Current animation frame (0, 1, or 2)
    animationTimer: 0, // Timer for animation frames
    animationSpeed: 9, // Animation speed (frames per second)
    lastMovement: null, // Track last movement direction
  }

  // -1 in right and bottom is because image ranges from 0..63
  // and not up to 64
  const isColliding = (dirx, diry) => {
    const left = hero.x - hero.width / 2;
    const right = hero.x + hero.width / 2 - 1;
    const top = hero.y - hero.height / 2;
    const bottom = hero.y + hero.height / 2 - 1;

    // check for collisions on sprite sides
    const collision =
      hero.map.isSolidTileAtXY(left, top) ||
      hero.map.isSolidTileAtXY(right, top) ||
      hero.map.isSolidTileAtXY(right, bottom) ||
      hero.map.isSolidTileAtXY(left, bottom);

    if (!collision) {
      return;
    }

    if (diry > 0) {
      hero.y = -hero.height / 2 + hero.map.getY(hero.map.getRow(bottom));
    } else if (diry < 0) {
      hero.y = hero.height / 2 + hero.map.getY(hero.map.getRow(top) + 1);
    } else if (dirx > 0) {
      hero.x = -hero.width / 2 + hero.map.getX(hero.map.getCol(right));
    } else if (dirx < 0) {
      hero.x = hero.width / 2 + hero.map.getX(hero.map.getCol(left) + 1);
    }
  }

  const move = (delta, dirx, diry) => {
    // Update direction based on movement
    if (dirx > 0) {
      hero.direction = 'right';
    } else if (dirx < 0) {
      hero.direction = 'left';
    } else if (diry > 0) {
      hero.direction = 'front';
    } else if (diry < 0) {
      hero.direction = 'back';
    }

    // Update animation frame
    if (dirx !== 0 || diry !== 0) {
      hero.animationTimer += delta;

      if (hero.animationTimer >= 1 / hero.animationSpeed) {
        hero.animationTimer = 0;
        hero.frame = (hero.frame + 1) % 3;
      }
    } else {
      hero.frame = 0;
    }

    // Move hero
    hero.x += dirx * hero.speed * delta;
    hero.y += diry * hero.speed * delta;

    // Check for collisions
    isColliding(dirx, diry);

    // Clamp values
    const maxX = hero.map.cols * hero.map.tsize;
    const maxY = hero.map.rows * hero.map.tsize;
    hero.x = Math.max(0, Math.min(hero.x, maxX));
    hero.y = Math.max(0, Math.min(hero.y, maxY));

    return {
      x: hero.x,
      y: hero.y
    };
  }

  hero.move = move;

  return hero;
}
