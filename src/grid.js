export const createDefaultGrid = () => {
  const map = {
    cols: 12,
    rows: 12,
    tsize: 64,
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
  }

  const getTile = (layer, col, row) => {
    return map.layers[layer][row * map.cols + col]
  }

  return {
    ...map,
    getTile,
    isSolidTileAtXY: (x, y) => {
      const col = Math.floor(x / map.tsize);
      const row = Math.floor(y / map.tsize);

      // tiles 3 and 5 are solid -- the rest are walkable
      // loop through all layers and return TRUE if any tile is solid
      return map.layers.reduce((res, layer, index) => {
        const tile = getTile(index, col, row);
        const isSolid = tile === 3 || tile === 5;

        return res || isSolid;
      }, false);
    },
    getCol: (x) => {
      return Math.floor(x / map.tsize)
    },
    getRow: (y) => {
      return Math.floor(y / map.tsize)
    },
    getX: (col) => {
      return col * map.tsize
    },
    getY: (row) => {
      return row * map.tsize
    }
  };
}
