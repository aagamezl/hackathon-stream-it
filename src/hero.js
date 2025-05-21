import { Loader } from "./loader.js"

// Hero functionality
export const createHero = (map, x, y) => {
  // Hero state
  const hero = {
    map,
    x,
    y,
    width: map.tsize,
    height: map.tsize,
    image: Loader.getImage('hero'),
    SPEED: 256
  }

  const collide = (dirx, diry) => {
    let row;
    let col;

    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
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
      row = hero.map.getRow(bottom);
      hero.y = -hero.height / 2 + hero.map.getY(row);
    } else if (diry < 0) {
      row = hero.map.getRow(top);
      hero.y = hero.height / 2 + hero.map.getY(row + 1);
    } else if (dirx > 0) {
      col = hero.map.getCol(right);
      hero.x = -hero.width / 2 + hero.map.getX(col);
    } else if (dirx < 0) {
      col = hero.map.getCol(left);
      hero.x = hero.width / 2 + hero.map.getX(col + 1);
    }
  }

  const move = (delta, dirx, diry) => {
    // move hero
    hero.x += dirx * hero.SPEED * delta
    hero.y += diry * hero.SPEED * delta

    // check if we walked into a non-walkable tile
    collide(dirx, diry)

    // clamp values
    const maxX = hero.map.cols * hero.map.tsize
    const maxY = hero.map.rows * hero.map.tsize

    hero.x = Math.max(0, Math.min(hero.x, maxX))
    hero.y = Math.max(0, Math.min(hero.y, maxY))

    // console.log(hero.x, hero.y);

    return {
      x: hero.x,
      y: hero.y
    }
  }

  // return {
  //   ...hero,
  //   move
  // }
  hero.move = move;

  return hero;
}
