export const TILE_WALL = 3;
export const TILE_BUSH = 5;
export const TILE_FLOOR = 1;
export const TILE_APPLE = 6;  // New collectible item

export const IS_SOLID_TILE = [TILE_WALL, TILE_BUSH];
export const COLLECTIBLE_TILE = TILE_APPLE;

export const createDefaultGrid = () => {
  const map = {
    columns: 12,
    rows: 12,
    tileSize: 64,
    layers: [[
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
      3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
      3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
      3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
    ], [
      4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
      4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
      4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
    ]]
  };

  const getTile = (layer, col, row) => {
    return map.layers[layer][row * map.columns + col];
  };

  return {
    ...map,
    getTile,
    isSolidTileAtXY: (x, y) => {
      const col = Math.floor(x / map.tileSize);
      const row = Math.floor(y / map.tileSize);

      // tiles 3 and 5 are solid -- the rest are walkable
      // loop through all layers and return TRUE if any tile is solid
      return map.layers.reduce((res, layer, index) => {
        const tile = getTile(index, col, row);
        const isSolid = tile === TILE_WALL || tile === TILE_BUSH;

        return res || isSolid;
      }, false);
    },
    isCollectibleAtXY: (x, y) => {
      const col = Math.floor(x / map.tileSize);
      const row = Math.floor(y / map.tileSize);
      
      // Check all layers for collectible items
      return map.layers.some(layer => {
        const tile = layer[row * map.columns + col];
        return tile === COLLECTIBLE_TILE;
      });
    },
    removeCollectibleAtXY: (x, y) => {
      const col = Math.floor(x / map.tileSize);
      const row = Math.floor(y / map.tileSize);
      
      // Remove collectible from all layers
      map.layers.forEach(layer => {
        const index = row * map.columns + col;
        if (layer[index] === COLLECTIBLE_TILE) {
          layer[index] = 0; // Set to empty
        }
      });
    },
    getColumn: (x) => {
      return Math.floor(x / map.tileSize);
    },
    getRow: (y) => {
      return Math.floor(y / map.tileSize);
    },
    getX: (col) => {
      return col * map.tileSize;
    },
    getY: (row) => {
      return row * map.tileSize;
    },
  };
};
