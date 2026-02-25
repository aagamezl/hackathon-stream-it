import { ImageLoader } from "./image-loader.js";
import { DIRECTIONS } from "./input.js";

export const DEFAULT_HERO_SPEED = 128; // STUDENT: try 64, 128, 256

export const createHero = (map, x, y) => {
  // Hero state
  const hero = {
    map,
    x,
    y,
    width: 32, // Each sprite frame is 64x 64 pixels
    height: 64,
    image: ImageLoader.getImage("hero"),
    speed: DEFAULT_HERO_SPEED,
    direction: DIRECTIONS.DOWN, // up, down, left, right
    frame: 0, // Current animation frame (0, 1, or 2)
    animationTimer: 0, // Timer for animation frames
    animationSpeed: 9, // Animation speed (frames per second)
    lastMovement: null, // Track last movement direction
  };

  // -1 in right and bottom is because image ranges from 0..63
  // and not up to 64
  const isColliding = (directionX, directionY) => {
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

    if (directionY > 0) {
      hero.y = -hero.height / 2 + hero.map.getY(hero.map.getRow(bottom));
    } else if (directionY < 0) {
      hero.y = hero.height / 2 + hero.map.getY(hero.map.getRow(top) + 1);
    } else if (directionX > 0) {
      hero.x = -hero.width / 2 + hero.map.getX(hero.map.getColumn(right));
    } else if (directionX < 0) {
      hero.x = hero.width / 2 + hero.map.getX(hero.map.getColumn(left) + 1);
    }
  };

  const move = (delta, directionX, directionY) => {
    // Update direction based on movement
    if (directionX > 0) {
      hero.direction = DIRECTIONS.RIGHT;
    } else if (directionX < 0) {
      hero.direction = DIRECTIONS.LEFT;
    } else if (directionY > 0) {
      hero.direction = DIRECTIONS.DOWN;
    } else if (directionY < 0) {
      hero.direction = DIRECTIONS.UP;
    }

    // Update animation frame
    if (directionX !== 0 || directionY !== 0) {
      hero.animationTimer += delta;

      if (hero.animationTimer >= 1 / hero.animationSpeed) {
        hero.animationTimer = 0;
        hero.frame = (hero.frame + 1) % 3;
      }
    } else {
      hero.frame = 0;
    }

    // Move hero
    hero.x += directionX * hero.speed * delta;
    hero.y += directionY * hero.speed * delta;

    // Check for collisions
    isColliding(directionX, directionY);

    // Clamp values
    const maxX = hero.map.columns * hero.map.tileSize;
    const maxY = hero.map.rows * hero.map.tileSize;
    hero.x = Math.max(0, Math.min(hero.x, maxX));
    hero.y = Math.max(0, Math.min(hero.y, maxY));

    return {
      x: hero.x,
      y: hero.y,
    };
  };

  hero.move = move;

  return hero;
};
