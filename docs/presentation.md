# Learning to Code with Games

## Section 1: How Computers Think

### What is a Program?
**Definition:** A program is a set of instructions that tells a computer what to do.

**Analogies:**
1. **Recipe Analogy:** Like a recipe tells you step-by-step how to bake a cake, a program tells a computer step-by-step what to do.
2. **Music Sheet Analogy:** Like sheet music tells a musician what notes to play, a program tells a computer what operations to perform.
3. **Treasure Map Analogy:** Like a treasure map gives directions to find treasure, a program gives directions to the computer to complete a task.

**Examples from Game Code:**
1. In `game.js`, the `tick()` function is like the game's heartbeat, running 60 times per second to update and render the game.
2. The `update()` function in `game.js` processes user input and updates the game state.
3. The `render()` function draws everything on the screen based on the current game state.

**Exercises:**
1. Find where the game's main loop is in the code. What happens if we make it run faster or slower?
2. In `hero.js` (line 53), find the `move()` function. The `hero.speed` is defined on line 4 as `DEFAULT_HERO_SPEED`. What happens if you change this value?
3. In `input.js` (around line 20), find where the game checks for keyboard input. Try changing the movement keys to use WASD instead of arrow keys. What changes do you need to make?

### Input → Processing → Output
**Definition:** The basic model of how computers work: they take input, process it, and produce output.

**Analogies:**
1. **Vending Machine:** You put in money (input), it processes your selection, and gives you a snack (output).
2. **Math Problem:** You write numbers (input), do calculations (process), and get an answer (output).
3. **Restaurant Order:** You tell the waiter your order (input), the kitchen prepares it (process), and you get your food (output).

**Examples from Game Code:**
1. In `input.js`, keyboard inputs are captured (input), processed in `game.js` (process), and result in the hero moving (output).
2. The `drawLayer()` function in `game.js` takes map data (input), processes which tiles to draw (process), and displays them on screen (output).
3. The collision detection in `hero.js` checks positions (input), determines if there's a collision (process), and moves the character back if needed (output).

**Exercises:**
1. Find where the game handles keyboard input. What happens if you change the key codes?
2. In `hero.js`, find the collision detection code. What happens if you comment out the collision check?
3. Try modifying the `drawLayer()` function to draw a different part of the map.

### Data Types
**Definition:** Different kinds of data that programs can work with, like numbers, text, and true/false values.

**Analogies:**
1. **Ingredients:** Like different types of ingredients (flour, eggs, sugar), programming has different data types (numbers, text, booleans).
2. **School Subjects:** Just as you use numbers in math and letters in language, programs use different data types for different purposes.
3. **Lego Blocks:** Different shaped blocks (data types) fit together in specific ways to build something (a program).

**Examples from Game Code:**
1. In `hero.js`, `x` and `y` are numbers representing position.
2. The `direction` property is a string (text) that can be 'front', 'back', 'left', or 'right'.
3. The `isColliding()` function returns a boolean (true/false) value.

**Exercises:**
1. In `hero.js` (lines 55-62), find where the direction is set based on movement. The directions are defined in `input.js` (lines 8-13). What happens if you add a new direction?
2. In `game.js` (line 230), the hero's starting position is set to (160, 160) when created. Try changing these values to move the hero's starting location. What happens if you use negative numbers or very large numbers?
3. In `hero.js` (lines 25-48), the `isColliding` function checks for solid tiles. The collision detection uses the map's `isSolidTileAtXY` method. What happens if you modify this check?

### Variables
**Definition:** Containers that store data values that can change during program execution.

**Analogies:**
1. **Backpack:** Like a backpack holds different items, a variable holds different values.
2. **Post-it Notes:** You can write different notes (values) on post-its (variables) and stick them in different places.
3. **Name Tags:** Like a name tag can be moved to different lockers, a variable can hold different values at different times.

**Examples from Game Code:**
1. In `hero.js`, `hero.x` and `hero.y` store the hero's position and change as the hero moves.
2. The `frame` variable in the hero object keeps track of which animation frame to show.
3. The `animationTimer` variable counts how much time has passed since the last animation frame.

**Exercises:**
1. In `hero.js` (line 4), you'll find `DEFAULT_HERO_SPEED = 128`. Try changing this value to make the hero move faster or slower. The game suggests trying 64 or 256 as alternative values.
2. In `hero.js`, try adding a new variable to track how many times the hero has moved.
3. In `hero.js` (line 18), the `animationSpeed` is set to 9 (frames per second). What happens if you change this value? Try different values to see how it affects the walking animation.

### Resources for Further Learning
1. [Code.org - Learn Computer Science](https://code.org/learn) - Great interactive tutorials for beginners.
2. [Scratch Programming](https://scratch.mit.edu/) - Visual programming language to learn basic concepts.
3. [Khan Academy - Computer Programming](https://www.khanacademy.org/computing/computer-programming) - Free interactive programming lessons.

### Questions for Discussion
1. Why do you think it's important for programs to have different data types?
2. How does the game use variables to make the character move smoothly across the screen?
3. Can you think of another real-world example of input → process → output in the game that we didn't mention?

## Section 2: Logic and Flow

### Logic Operators and Boolean Logic
**Definition:** Logic operators (AND, OR, NOT) and comparisons (==, >, <) help programs make decisions.

**Analogies:**
1. **Light Switches:** Like having multiple light switches that can be ON (true) or OFF (false), and combining them with AND (both on), OR (at least one on), or NOT (opposite).
2. **Recipe Conditions:** "If it's dinner time AND we have ingredients, then cook" - both conditions must be true.
3. **Sports Rules:** In basketball, a shot can be worth 2 points OR 3 points depending on where it's taken from.

**Examples from Game Code:**
1. In `hero.js` (around line 25), the collision detection checks all four corners:
   ```javascript
   const collision =
     hero.map.isSolidTileAtXY(left, top) ||
     hero.map.isSolidTileAtXY(right, top) ||
     hero.map.isSolidTileAtXY(right, bottom) ||
     hero.map.isSolidTileAtXY(left, bottom);
   ```
2. In `hero.js` (around line 50), the movement logic sets the direction:
   ```javascript
   if (directionX > 0) {
     hero.direction = DIRECTIONS.RIGHT;
   } else if (directionX < 0) {
     hero.direction = DIRECTIONS.LEFT;
   }
   ```
3. In `hero.js` (around line 60), the animation frame update checks if the hero is moving:
   ```javascript
   if (directionX !== 0 || directionY !== 0) {
     // Update animation
   }
   ```

**Exercises:**
1. In `hero.js`, find where the game checks for collisions. What happens if you change the `||` (OR) operators to `&&` (AND)?
2. Try modifying the movement code to only allow diagonal movement (both x and y must be non-zero).
3. Add a new condition to make the hero run (move faster) when holding the SHIFT key.

### Math Operations
**Definition:** Basic arithmetic operations (+, -, *, /) that computers use to calculate values.

**Analogies:**
1. **Cooking Measurements:** Like adjusting a recipe by doubling or halving ingredients.
2. **Piggy Bank:** Adding to savings (+) or spending money (-) changes your total.
3. **Speed and Distance:** How far you travel depends on your speed multiplied by time.

**Examples from Game Code:**
1. In `hero.js` (around line 70), the hero's position is updated:
   ```javascript
   hero.x += directionX * hero.speed * delta;
   hero.y += directionY * hero.speed * delta;
   ```
2. In `hero.js` (around line 60), the animation cycles through frames:
   ```javascript
   hero.frame = (hero.frame + 1) % 3;
   ```
3. In `hero.js` (around line 25), the collision boundaries are calculated:
   ```javascript
   const left = hero.x - hero.width / 2;
   const right = hero.x + hero.width / 2 - 1;
   ```

**Exercises:**
1. Change the hero's speed multiplier. What happens if you make it too big or too small?
2. Modify the animation code to make the character animate faster or slower.
3. Try changing the collision boundaries to make the character's hitbox larger or smaller.

### Conditional Statements (if/else)
**Definition:** Code that makes decisions based on conditions being true or false.

**Analogies:**
1. **Traffic Lights:** "If the light is green, go; else if yellow, slow down; else stop."
2. **Weather Decisions:** "If it's raining, take an umbrella; else if it's sunny, wear sunglasses."
3. **Game Rules:** "If the ball goes out of bounds, it's the other team's turn."

**Examples from Game Code:**
1. The direction update uses if/else if to set the hero's facing direction:
   ```javascript
   if (directionX > 0) {
     hero.direction = DIRECTIONS.RIGHT;
   } else if (directionX < 0) {
     hero.direction = DIRECTIONS.LEFT;
   } else if (directionY > 0) {
     hero.direction = DIRECTIONS.DOWN;
   } else if (directionY < 0) {
     hero.direction = DIRECTIONS.UP;
   }
   ```
2. In `hero.js` (around line 30), the collision response checks which side collided:
   ```javascript
   if (directionY > 0) {
     hero.y = -hero.height / 2 + hero.map.getY(hero.map.getRow(bottom));
   } else if (directionY < 0) {
     hero.y = hero.height / 2 + hero.map.getY(hero.map.getRow(top) + 1);
   }
   ```
3. In `hero.js` (around line 60), the animation updates only when moving:
   ```javascript
   if (directionX !== 0 || directionY !== 0) {
     hero.animationTimer += delta;
     // ...
   } else {
     hero.frame = 0;
   }
   ```

**Exercises:**
1. In `hero.js` (around line 15), try changing the hero's speed. What happens when you make it faster or slower? How does it affect gameplay?
2. In `game.js` (around line 30), find the game loop's `tick` function where it calls `update()` and `render()`. What happens if you change the order of these function calls?
3. In `input.js` (around line 20), try changing the arrow keys to different letters (like 'WASD'). Don't forget to update all four directions (up, down, left, right).

### Loops
**Definition:** Code that repeats a set of instructions until a condition is met.

**Analogies:**
1. **Jump Rope:** You keep jumping until you miss or get tired.
2. **Brushing Teeth:** You brush each section of your mouth until all are clean.
3. **Playlist:** A music player keeps playing the next song until you press stop.

**Examples from Game Code:**
1. The game loop in `game.js` runs continuously to update and render the game:
   ```javascript
   const tick = (currentTime) => {
     window.requestAnimationFrame(tick)
     // Update and render game
   }
   ```
2. The `drawLayer` function uses nested for-loops to draw each tile:
   ```javascript
   for (let c = startCol; c <= endCol; c++) {
     for (let r = startRow; r <= endRow; r++) {
       // Draw tile at column c, row r
     }
   }
   ```
3. The animation frame counter loops through values 0, 1, 2, 0, 1, 2...:
   ```javascript
   hero.frame = (hero.frame + 1) % 3
   ```

**Exercises:**
1. In `game.js` (around line 30), find the `tick` function. Add `console.log('Game updated!')` inside it. Open your browser's developer tools (F12) and look at the console tab to see the messages.
2. In `hero.js` (around line 60), find where the animation frame updates. Change `% 3` to `% 2`. The animation will now cycle through only 2 frames instead of 3. How does this affect the walking animation?
3. In `input.js` (around line 20), add `console.log('Key pressed:', event.key)` inside the keydown event listener. Now when you press keys, you'll see which keys are being detected in the browser's console.

### Resources for Further Learning
1. [MDN JavaScript Guide - Control Flow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) - Detailed explanation of control flow in JavaScript.
2. [Codecademy - Learn JavaScript](https://www.codecademy.com/learn/introduction-to-javascript) - Interactive JavaScript course with exercises.
3. [Eloquent JavaScript - Program Structure](https://eloquentjavascript.net/02_program_structure.html) - In-depth chapter on program structure and control flow.

### Questions for Discussion
1. Why do you think the game uses `directionX !== 0 || directionY !== 0` to check if the hero is moving, instead of just `true`?
2. How does the game ensure smooth animation even when the frame rate changes?
3. Can you think of another place in the game where a loop or conditional statement might be useful?

## Section 3: Advanced Concepts & Presentations

### Functions: Grouping Reusable Logic
**Definition:** Functions are blocks of code designed to perform specific tasks, which can be reused throughout a program.

**Analogies:**
1. **Kitchen Appliances:** Like a toaster that performs one specific task (toasting bread) that you can use over and over.
2. **Math Formulas:** Like a formula you create once (e.g., area of a circle) and can use with different inputs.
3. **Dance Moves:** Like learning a dance routine once, then being able to perform it whenever the music plays.

**Examples from Game Code:**
1. The `createHero` function encapsulates all hero-related logic:
   ```javascript
   export const createHero = (map, x, y) => {
     // All hero properties and methods
     return hero
   }
   ```
2. The `move` function handles all movement logic:
   ```javascript
   const move = (delta, directionX, directionY) => {
     // Movement and collision logic
   }
   hero.move = move
   ```
3. The `isColliding` function checks for collisions:
   ```javascript
   const isColliding = (directionX, directionY) => {
     // Collision detection logic
   }
   ```

**Exercises:**
1. In `hero.js`, create a new function called `jump` that makes the hero move upward when called.
2. In `hero.js` (around line 40), modify the `move` function to accept a `speedMultiplier` parameter.
3. In `hero.js` (around line 60), extract the animation update code into its own function called `updateAnimation`.

### Events: Responding to User Actions
**Definition:** Events are actions or occurrences that happen in the system you're programming, which the system tells you about so you can respond to them.

**Analogies:**
1. **Doorbell:** When someone rings the doorbell (event), you respond by answering the door.
2. **Traffic Signals:** When a light turns green (event), drivers respond by pressing the gas.
3. **Alarm Clock:** When the alarm goes off (event), you wake up and turn it off.

**Examples from Game Code:**
1. Basic keyboard input in `input.js`:
   ```javascript
   // Handling arrow key presses
   window.addEventListener('keydown', (event) => {
     if (event.key === 'ArrowRight') {
       // Move right
     } else if (event.key === 'ArrowLeft') {
       // Move left
     }
   })
   ```
2. The game loop in `game.js` that runs every frame:
   ```javascript
   const tick = (currentTime) => {
     window.requestAnimationFrame(tick)
     const delta = (currentTime - lastTime) / 1000 // Convert to seconds
     lastTime = currentTime
     update(delta)
     render()
   }
   ```
3. In `hero.js` (around line 60), the animation updates based on movement:
   ```javascript
   // Update animation frame based on movement
   if (directionX !== 0 || directionY !== 0) {
     hero.animationTimer += delta;
     if (hero.animationTimer >= 1 / hero.animationSpeed) {
       hero.animationTimer = 0;
       hero.frame = (hero.frame + 1) % 3
     }
   }
   ```

**Exercises:**
1. In `input.js` (around line 20), change one of the arrow key checks (like `'ArrowRight'`) to a letter key (like `'d'`). Test if the new key works for movement.
2. In `game.js` (around line 10), find where the canvas is created. Try changing its width or height to make the game window larger or smaller.
3. In `hero.js` (around line 15), find where the hero's size is set. What happens if you make the hero bigger or smaller? Does it affect the collision detection?

### Let's Make It Your Own!
Try these fun and easy changes to customize the game:

1. **Quick Tweaks**
   - Make the hero move faster or slower
   - Change how fast the walking animation plays
   - Make the game window bigger or smaller

2. **Visual Changes**
   - Change the hero's size
   - Increase the collision box thickness
   - Change the color of collision boundaries (hero, walls and obstacles)
   - **Try this:** In `game.js` (around line 85), modify the `drawLayer` function to draw only every other tile by changing the loop to use `i += 2` instead of `i++`. This will create a checkerboard pattern in the game world.

3. **Level Design**
   - Design your own level layout
   - Add more obstacles
   - Create interesting paths and mazes

### Resources for Further Learning
1. [MDN - Functions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) - Comprehensive guide to functions in JavaScript.
2. [JavaScript.info - Introduction to Events](https://javascript.info/introduction-browser-events) - Detailed explanation of browser events.
3. [Mozilla Developer Network - Game Development](https://developer.mozilla.org/en-US/docs/Games) - Resources for game development with JavaScript.

### Final Project: Create Your Own Game Feature
**Challenge:** Add a new feature to the game using what you've learned about functions and events.

**Requirements:**
1. Create at least one new function
2. Use at least one event listener
3. Include comments explaining your code
4. Test your feature thoroughly

**Ideas to Get Started:**
- Add a double-jump ability
- Create collectible items with different effects
- Implement a simple enemy that moves back and forth
- Add a start screen and game over screen

### Presentation Time!
Prepare a short (2-3 minute) presentation about your game feature:
1. What does your feature do?
2. How did you implement it?
3. What challenges did you face?
4. What would you like to add next?

### Questions for Reflection
1. How do functions help make code more organized and reusable?
2. What are some other types of events that could be useful in a game?
3. How could you modify the game to make it more challenging or interesting?
