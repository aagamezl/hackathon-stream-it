Let me check the `isColliding` function in the hero.js file to help you understand it better.

The [isColliding](cci:1://file:///home/aagamezl/workspace/personal/git-repos/hackathon-stream-it/src/hero.js:22:2-50:4) function checks if the hero character is colliding with solid tiles in the game world. Here's a breakdown of how it works:

1. **Boundary Calculation**:
   - `left`: The left edge of the hero's hitbox
   - `right`: The right edge of the hitbox (minus 1 pixel to stay within bounds)
   - `top`: The top edge of the hitbox
   - `bottom`: The bottom edge of the hitbox (minus 1 pixel to stay within bounds)

2. **Collision Detection**:
   It checks for collisions at all four corners of the hero's hitbox using `map.isSolidTileAtXY()`. If any corner is on a solid tile, there's a collision.

3. **Collision Response**:
   If a collision is detected, it adjusts the hero's position based on the movement direction:
   - Moving down (`directionY > 0`): Adjusts the hero's Y position to be just above the colliding tile
   - Moving up (`directionY < 0`): Adjusts the hero's Y position to be just below the colliding tile
   - Moving right (`directionX > 0`): Adjusts the hero's X position to be just left of the colliding tile
   - Moving left (`directionX < 0`): Adjusts the hero's X position to be just right of the colliding tile

The function uses `map.getX()`, `map.getY()`, `map.getRow()`, and `map.getColumn()` to convert between pixel coordinates and tile coordinates, ensuring smooth collision response that aligns with the game's grid system.
