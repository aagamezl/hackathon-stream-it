# Hackathon: Learning to Code with Games

## 1. How Computers Think

### What is a program?
A program is a set of instructions that tells the computer what to do. In our game, the program controls everything from moving the character to displaying the graphics.

**Example from our game:**
```javascript
// src/hero.js - Lines 6-23
// This code defines how our hero moves
move(delta, dirx, diry) {
  // Calculate movement based on direction and speed
  this.x += dirx * this.speed * (delta / 1000);
  this.y += diry * this.speed * (delta / 1000);
  
  // Update animation frame
  if (dirx !== 0 || diry !== 0) {
    this.animationTimer += delta;
    if (this.animationTimer > 100) {
      this.animationTimer = 0;
      this.frame = (this.frame + 1) % 2; // Toggle between 0 and 1
    }
  }
}
```

### Input → Processing → Output
Every program follows this basic pattern:
- **Input**: User presses arrow keys
- **Processing**: Game calculates new position
- **Output**: Screen updates to show movement

**Real-world analogy:**
1. **Input**: Pressing a light switch (input)
2. **Processing**: Electricity flows through the circuit (processing)
3. **Output**: Light turns on/off (output)

## 2. Data Types & Variables

### Numbers, Text, and Boolean
Variables store different types of data:

```javascript
// src/hero.js - Lines 1-5
// Numbers
const DEFAULT_HERO_SPEED = 128;  // Whole number (integer)
const heroHeight = 64.5;        // Decimal number (float)

// Text (String)
const heroName = "Adventurer";  // Text in quotes

// Boolean (true/false)
const isPlayerAlive = true;     // Can only be true or false
```

### Hands-on Activity: Modifying Game Variables
1. Open `src/hero.js`
2. Find the `DEFAULT_HERO_SPEED` constant (around line 6)
3. Try changing the value to see how it affects the game:
   - Lower number (e.g., 64) = Slower movement
   - Higher number (e.g., 256) = Faster movement

**Challenge:** 
- What happens if you set the speed to 0?
- What's the maximum speed before the movement looks too fast?

### Real-world Analogies:
1. **Variables** are like labeled boxes where you can store things (numbers, text, etc.)
2. **Constants** are like fixed signs that never change (like the speed limit on a road)
3. **Data types** are like different kinds of containers (some for numbers, some for text, etc.)

## 3. Logic and Operators

### Comparison and Logical Operators
In programming, we use operators to compare values and make decisions.

**Example from our game:**
```javascript
// src/hero.js - Lines 18-23
// Using comparison operators (>, <, ===, !==)
if (this.animationTimer > 100) {
  this.animationTimer = 0;
  this.frame = (this.frame + 1) % 2; // Toggle between 0 and 1
}
```

### Boolean Logic in Action
Boolean values (true/false) help control the game's flow.

```javascript
// src/hero.js - Simplified example
// Using logical operators (&&, ||, !)
if ((dirx !== 0 || diry !== 0) && this.isAlive) {
  // Move character only if there's movement AND character is alive
  this.x += dirx * this.speed * (delta / 1000);
  this.y += diry * this.speed * (delta / 1000);
}
```

### Hands-on Activity: Adding a Power-up
Let's add a simple power-up that doubles the hero's speed when collected.

1. Open `src/hero.js`
2. Add these new variables at the top of the file:
```javascript
let hasSpeedBoost = false;
const NORMAL_SPEED = 128;
const BOOSTED_SPEED = 256;
```

3. Modify the movement code to use the speed boost:
```javascript
// Inside the move() method
const currentSpeed = hasSpeedBoost ? BOOSTED_SPEED : NORMAL_SPEED;
this.x += dirx * currentSpeed * (delta / 1000);
this.y += diry * currentSpeed * (delta / 1000);
```

4. Add a method to toggle the speed boost:
```javascript
toggleSpeedBoost(boostActive) {
  hasSpeedBoost = boostActive;
  console.log(`Speed boost ${boostActive ? 'activated!' : 'deactivated'}`);
}
```

**Challenge:** 
- Add a key press (like 'B') to toggle the speed boost
- Make the speed boost last for only 5 seconds
- Add a visual effect when the boost is active

### Real-world Analogies:
1. **If statements** are like making decisions at a traffic light (if green → go, if red → stop)
2. **Boolean values** are like light switches (on/off, true/false)
3. **Logical operators** are like combining conditions (if it's NOT raining AND I have an umbrella, then I'll go outside)

## 4. Control Flow

### Conditional Statements (if/else)
Conditional statements help your program make decisions.

**Example from our game:**
```javascript
// src/game.js - Simplified example
// Handling player movement based on keyboard input
let directionX = 0;
let directionY = 0;

if (keyboard.isDown(KEYBOARD.LEFT)) {
  directionX = -1;
} else if (keyboard.isDown(KEYBOARD.RIGHT)) {
  directionX = 1;
} else if (keyboard.isDown(KEYBOARD.UP)) {
  directionY = -1;
} else if (keyboard.isDown(KEYBOARD.DOWN)) {
  directionY = 1;
}

// Update hero position
hero.move(deltaTime, directionX, directionY);
```

### Loops (for/while)
Loops help you repeat actions without writing the same code multiple times.

**Example from our game:**
```javascript
// src/grid.js - Simplified example
// Drawing the game grid
for (let row = 0; row < this.rows; row++) {
  for (let col = 0; col < this.columns; col++) {
    const tile = this.getTile(layer, col, row);
    if (tile) {
      // Draw the tile at the calculated position
      ctx.drawImage(
        this.tileAtlas,
        tile.x, tile.y, tile.width, tile.height,
        col * this.tileSize, row * this.tileSize,
        this.tileSize, this.tileSize
      );
    }
  }
}
```

### Hands-on Activity: Adding Obstacles
Let's add obstacles that the player needs to avoid.

1. Create a new file `src/obstacle.js`:
```javascript
export function createObstacle(x, y, width = 32, height = 32) {
  return {
    x,
    y,
    width,
    height,
    color: '#FF0000', // Red color for obstacles
    
    draw(ctx, camera) {
      // Draw the obstacle relative to the camera
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x - camera.x,
        this.y - camera.y,
        this.width,
        this.height
      );
    },
    
    collidesWith(hero) {
      // Simple collision detection
      return hero.x < this.x + this.width &&
             hero.x + hero.width > this.x &&
             hero.y < this.y + this.height &&
             hero.y + hero.height > this.y;
    }
  };
}
```

2. In `game.js`, add obstacles and check for collisions:
```javascript
// Add this near the top with other game state
const obstacles = [
  createObstacle(200, 200, 64, 64),
  createObstacle(400, 300, 64, 64),
  createObstacle(100, 400, 64, 64)
];

// In the update function
function update(delta) {
  // ... existing movement code ...
  
  // Check for collisions with obstacles
  obstacles.forEach(obstacle => {
    if (obstacle.collidesWith(hero)) {
      console.log('Ouch! Hit an obstacle!');
      // Add collision response here
    }
  });
}

// In the render function
function render() {
  // ... clear canvas ...
  
  // Draw obstacles
  obstacles.forEach(obstacle => obstacle.draw(ctx, camera));
  
  // ... draw hero and other elements ...
}
```

**Challenge:**
- Add different types of obstacles with various effects
- Make the player bounce back when hitting an obstacle
- Add a score that decreases when hitting obstacles

## 5. Functions & Events

### Grouping Reusable Logic
Functions help organize code into reusable blocks.

**Example from our game:**
```javascript
// src/input.js - Simplified example
function createKeyboard(keys) {
  const keyState = {};
  
  // Set up event listeners
  window.addEventListener('keydown', (e) => {
    keyState[e.key] = true;
  });
  
  window.addEventListener('keyup', (e) => {
    keyState[e.key] = false;
  });
  
  // Public API
  return {
    isDown(key) {
      return keyState[key] || false;
    }
  };
}
```

### Responding to User Input
Events allow your game to respond to user actions.

**Example from our game:**
```javascript
// In main.js - Setting up keyboard controls
const keyboard = createKeyboard([
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'b'
]);

// In the game loop
function update(delta) {
  // Handle movement
  let dirX = 0, dirY = 0;
  if (keyboard.isDown('ArrowLeft')) dirX = -1;
  if (keyboard.isDown('ArrowRight')) dirX = 1;
  if (keyboard.isDown('ArrowUp')) dirY = -1;
  if (keyboard.isDown('ArrowDown')) dirY = 1;
  
  hero.move(delta, dirX, dirY);
  
  // Toggle debug mode with space
  if (keyboard.isDown(' ')) {
    state.debug = !state.debug;
  }
  
  // Toggle boost with 'b'
  if (keyboard.isDown('b')) {
    hero.toggleSpeedBoost(true);
  } else {
    hero.toggleSpeedBoost(false);
  }
}
```

### Hands-on Activity: Camera Movement and Hero Speed
Let's enhance the game by adding adjustable camera movement and hero speed controls.

1. First, let's make the camera movement smoother by modifying the camera update in `game.js`:
```javascript
// In game.js - Update the camera update section
const { screenX, screenY } = state.camera.update(
  state.hero.x,  // Target X to follow
  state.hero.y,  // Target Y to follow
  0.1,           // Smoothing factor (0-1), lower is smoother
  100            // Lookahead distance (pixels)
);

state.hero.screenX = screenX;
state.hero.screenY = screenY;
```

2. Let's add speed control to the hero. In `hero.js`:
```javascript
// In hero.js - Update the hero creation to include speed control
export const createHero = (map, x, y) => {
  // Hero state
  const hero = {
    map,
    x,
    y,
    width: 32,
    height: 64,
    image: ImageLoader.getImage('hero'),
    baseSpeed: DEFAULT_HERO_SPEED,  // Use the exported constant
    currentSpeed: DEFAULT_HERO_SPEED,
    direction: DIRECTIONS.DOWN,
    frame: 0,
    animationTimer: 0,
    animationSpeed: 9,
    lastMovement: null,
    
    // Update method using currentSpeed
    move(delta, dirX, dirY) {
      this.x += dirX * this.currentSpeed * (delta / 1000);
      this.y += dirY * this.currentSpeed * (delta / 1000);
      
      // Update animation if moving
      if (dirX !== 0 || dirY !== 0) {
        this.animationTimer += delta;
        if (this.animationTimer > 100) {
          this.animationTimer = 0;
          this.frame = (this.frame + 1) % 2;
        }
      }
    },
    
    // Method to update speed
    setSpeedMultiplier(multiplier) {
      this.currentSpeed = this.baseSpeed * multiplier;
    },
    
    // Method to reset to default speed
    resetSpeed() {
      this.currentSpeed = this.baseSpeed;
    }
  };
  
  return hero;
};
```

3. Let's add keyboard controls for speed adjustment in `game.js`:
```javascript
// In the update function, after handling movement
if (state.keyboard.isDown('1')) {
  // Reset to normal speed
  state.hero.setSpeedMultiplier(1);
} else if (state.keyboard.isDown('2')) {
  // Double speed
  state.hero.setSpeedMultiplier(2);
} else if (state.keyboard.isDown('3')) {
  // Triple speed
  state.hero.setSpeedMultiplier(3);
}
```

**Challenge:**
- Add visual feedback when speed changes (e.g., speed lines, color tint)
- Make the camera zoom in/out based on hero's speed
- Add a temporary speed boost that activates when holding SHIFT
  - Hands-on: Adding keyboard controls

```javascript
// filename - start-line:end-line
```

```javascript
// filename - start-line:end-line
```

```javascript
// filename - start-line:end-line
```

### Real world Analogies

1.
2.
3.
