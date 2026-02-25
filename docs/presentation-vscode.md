# Presentation: How Computers Think

Target audience: Teen girls (15–18) learning to code through a web video game in this bootcamp.

Timing: follow the workshop schedule in docs/schedule-hackathon.md. Suggested for this section: 45–60 minutes (20–30 min teaching + 20–30 min hands-on exercises and Q&A).

## Goal
Explain the basic way computers 'think' so students can read and change the game code with confidence.

## Key concepts (simple and short)
1. Binary and data: computers store data as 0s and 1s; numbers, letters and states are all data.
2. Variables and types: containers that hold data (numbers, text, true/false).
3. Instructions and sequential steps: code runs line-by-line unless told otherwise.
4. Conditions and decisions: if something is true, the program takes one path, else another.
5. Loops: repeat actions until a condition changes.
6. Functions: named groups of instructions you can call again.

---

## Analogies (3 per concept)

- Binary and data
  1. Light switches: 0 = off, 1 = on (simple on/off choices build complex pictures when combined).
  2. Beads on an abacus: each bead position contributes to a number.
  3. Locker labels: each locker (bit) is either open (1) or closed (0); many lockers together can encode a message.

- Variables and types
  1. Boxes with labels: a named box where you put something (a number, a toy, a note).
  2. School folders: one folder for homework (array/list), one sheet for a single note (string/number).
  3. ID cards: string for a name, number for age, boolean for 'hasPermission'.

- Instructions and sequential steps
  1. Recipe steps: follow in order to bake a cake.
  2. Dance choreography: do moves in sequence unless a repeat is told.
  3. Treasure map: follow the path step by step.

- Conditions and decisions
  1. Traffic lights: if green go, if red stop.
  2. Choosing clothes: if it rains, wear a jacket, else wear a t-shirt.
  3. Door with keypad: if code correct open, else stay closed.

- Loops
  1. Jumping rope: repeat jumps until you stop.
  2. Washing machine cycle: keep spinning until timer ends.
  3. Rehearsing a song: repeat chorus until it sounds right.

- Functions
  1. Micro-helpers: a mini recipe for a sauce you reuse in many dishes.
  2. Phone shortcuts: tap once to run a sequence (call, message, open app).
  3. School club: a named group that does tasks when asked.

---

## 3 Examples based on the game source code (look in /src)
Note: the exact filenames vary by project; search src for these patterns: player, enemy, level, game-loop, input.

1. Variables & types
   - Example A: player.x and player.y (numbers) determine position on screen.
   - Example B: player.name (string) displays the player's name on screen.
   - Example C: isAlive (boolean) determines whether to draw the player or show 'Game Over'.

2. Conditions & decisions
   - Example A: if (player.health <= 0) { endGame(); } — ends the game when health is zero.
   - Example B: if (keyPressed === 'ArrowLeft') { player.x -= speed; } — move left when key pressed.
   - Example C: if (score >= levelThreshold) { nextLevel(); } — advance levels when score meets threshold.

3. Loops & the game loop
   - Example A: requestAnimationFrame(gameLoop) — repeats rendering and logic every frame.
   - Example B: for (let i = 0; i < enemies.length; i++) { enemies[i].update(); } — update all enemies each frame.
   - Example C: while (bullets.length > 0) { /* check collisions */ break; } — process bullets until none left.

4. Functions
   - Example A: function drawPlayer(ctx) { /* draw code */ } — draws the player sprite on canvas.
   - Example B: function checkCollision(a, b) { return /* true/false */ } — reusable collision check.
   - Example C: function resetLevel() { player.reset(); enemies = []; } — prepare level restart.

---

## 3 Short exercises (practice during session)
(Keep them small so students finish in the session.)

1. Inspect & Print
   - Task: open src/*player* or the file that defines the player. Add a console.log to print player position each frame. Run the game and observe.
   - Goal: see how variables change in real time.

2. Change a variable
   - Task: find the speed variable (player speed) and double it. Play and observe differences.
   - Goal: understand how changing numbers affects behavior.

3. Add a simple condition
   - Task: add a boolean flag like invincible = true/false and use it to ignore damage (wrap damage code with if (!invincible) { ... }). Toggle it and test.
   - Goal: understand booleans and if statements.

---

## 3 Resources to continue learning
1. MDN Web Docs — JavaScript basics: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
2. Khan Academy — Intro to JS/ProcessingJS: https://www.khanacademy.org/computing/computer-programming
3. CS Unplugged — concepts for teaching computing ideas with activities: https://csunplugged.org/en/

---

## 3 Questions to answer in the presentation
1. How does the game know where the player is on the screen? (Discuss variables and coordinates)
2. What happens in the code when the player presses a key? (Discuss input → condition → state change)
3. How can we prevent a bug from repeating across levels? (Discuss functions, reuse, and testing)

---

## Notes for the instructor (short)
- Keep explanations visual and use live code editing in VS Code to show changes in the running game.
- Encourage students to experiment with small edits; immediate feedback in the game helps learning.
- Follow exact timing in docs/schedule-hackathon.md but aim for interactive pacing: teach briefly, then let them try.

<!-- section 2 and 3 will be added next, one at a time when requested -->

## Section 2: Logic and Flow

Timing: follow docs/schedule-hackathon.md. Suggested: 60–75 minutes (25–35 min teaching + 30–40 min hands-on exercises and debugging).

## Goal
Teach how programs make decisions and repeat work, and how game input and state changes are handled.

## Key concepts (simple and short)
1. Boolean logic: true/false values and logical operators (&&, ||, !).
2. Comparisons: >, <, >=, <=, ==, === and why strict equality matters.
3. Combining conditions: checking multiple things at once (AND / OR).
4. Control flow: if / else, switch statements.
5. Event-driven input: responding to user actions (keydown, click).
6. State & state machines: keeping track of the game's current mode (menu, playing, paused, gameOver).

---

## Analogies (3 per concept)

- Boolean logic
  1. Light on/off: a statement is either true (on) or false (off).
  2. Yes/no questions: a simple true/false answer.
  3. Passport check: either allowed (true) or denied (false).

- Comparisons
  1. Height check for a ride: must be taller than the limit to join.
  2. Exam grading: score >= passingScore to get a pass.
  3. Matching puzzle pieces: exact fit (===) versus similar shape (==).

- Combining conditions
  1. Door opens when you have key AND know the code (AND).
  2. You can join the club if you are a student OR a teacher (OR).
  3. Weather and time: go out if it's not raining AND after 6pm.

- Control flow
  1. Road signs: make choices at intersections (if/else).
  2. Choose-your-own-adventure book: follow different pages depending on choices.
  3. School timetable: switch to different classes based on the hour (switch).

- Event-driven input
  1. A doorbell: when pressed, someone responds immediately.
  2. Texting: actions happen when a message arrives.
  3. Game controller: pressing a button triggers movement.

- State & state machines
  1. Traffic light states: red, yellow, green — only certain actions allowed in each.
  2. Stage play: different scenes with different props and actions.
  3. Phone modes: silent, vibrate, ring — behavior changes with mode.

---

## 3 Examples based on the game source code (look in /src)

1. Boolean logic & comparisons
   - Example A: if (player.health <= 0) { isAlive = false; } — set boolean from comparison.
   - Example B: if (enemy.x < player.x && !enemy.alerted) { enemy.patrol = false; enemy.alerted = true; } — combine checks with && and !.
   - Example C: if (input.key === 'ArrowUp' || input.key === 'w') { jump(); } — accept multiple keys with ||.

2. Control flow & state
   - Example A: switch (gameState) { case 'menu': showMenu(); break; case 'playing': updateGame(); break; } — change behavior by state.
   - Example B: if (gameState === 'paused') { return; } — early exit to stop updates when paused.
   - Example C: if (score >= levelThreshold) { level++; initLevel(level); } else { showProgress(); } — branching for progression.

3. Event-driven input & listeners
   - Example A: window.addEventListener('keydown', (e) => { keys[e.key] = true; }); — register keydown events.
   - Example B: canvas.addEventListener('click', (e) => { shoot(e.clientX, e.clientY); }); — act on clicks.
   - Example C: document.addEventListener('keyup', (e) => { keys[e.key] = false; }); — track key release.

---

## 3 Exercises (practice & debugging)

1. Fix a broken condition
   - Task: find a bug where enemy never becomes alerted. Inspect the condition using console.log checks and fix a misplaced || vs &&.
   - Goal: learn to read and correct boolean logic.

2. Add pause/resume state
   - Task: add a 'paused' state that stops updates but keeps the canvas visible. Add a key (e.g., 'p') to toggle it.
   - Goal: understand state management and early returns in the game loop.

3. Multiple-input handling
   - Task: allow both WASD and arrow keys for movement. Update input handlers and ensure combining keys works (diagonal movement).
   - Goal: practice event listeners and combining conditions.

---

## 3 Resources to continue learning
1. MDN — Logical operators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators
2. freeCodeCamp — Basic JavaScript (conditions & loops): https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/
3. Eloquent JavaScript — Chapters on program structure and functions: https://eloquentjavascript.net/

---

## 3 Questions to answer in the presentation
1. What is the difference between == and ===, and why use === in most cases?
2. How would you stop the game loop when the game is paused or over?
3. How can combining conditions (&& / ||) create unexpected behavior, and how do you test for it?

---

## Notes for the instructor (short)
- Use live debugging: add console.log or breakpoints to show condition evaluation.
- Encourage pair debugging: one student changes code while the other tests the game.
- Keep tasks small and focused; students should see immediate changes in the running game.

<!-- section 3 will be added next when requested -->

## Section 3: Advanced Concepts & Presentations

Timing: follow docs/schedule-hackathon.md. Suggested: 90–120 minutes total (40–60 min advanced concepts and hands-on + 30–40 min student presentations + 20 min feedback).

## Goal
Introduce modular code, debugging, simple performance ideas, collaboration (Git), and how to present a project clearly to an audience or judges.

## Key concepts (simple and short)
1. Modularity & separation: split code into small files/functions so it's easier to read and reuse.
2. Debugging and testing: ways to find and fix bugs and verify behavior.
3. Performance basics: avoid unnecessary work, optimize hot paths (rendering, collision checks).
4. Version control & collaboration: using Git to save history and share code.
5. Code organization & comments: keep files focused and document intent.
6. Presentation skills: show goals, demo, explain choices, and next steps.

---

## Analogies (3 per concept)

- Modularity & separation
  1. Lego bricks: build small pieces and combine them to make complex structures.
  2. Kitchen stations: one person handles salads, another the oven — clear roles make cooking smooth.
  3. Chapters in a book: each chapter covers one idea so readers can find it easily.

- Debugging and testing
  1. Detective work: follow clues (logs) to find the culprit (bug).
  2. Safety checks: test that a parachute opens before trusting it in a demo.
  3. Spellcheck: find mistakes automatically and fix them.

- Performance basics
  1. Packing a suitcase efficiently: avoid carrying extra weight (unused computations).
  2. Traffic lanes: more lanes (optimized loops) let traffic flow faster.
  3. Reusing containers: don't create new boxes every time if you can reuse one (object pooling).

- Version control & collaboration
  1. Timeline of a project: like saving drafts of an essay so you can revert.
  2. Group project folder: everyone works on separate parts and merges changes.
  3. Undo button for code: make a change and revert if it breaks.

- Code organization & comments
  1. Post-it notes: short reminders attached to code to explain intent.
  2. Table of contents: help people find chapters quickly.
  3. Labels on jars: know what's inside without opening.

- Presentation skills
  1. Movie trailer: show the best parts to excite the audience.
  2. Elevator pitch: explain the idea in one clear sentence.
  3. Show-and-tell: demo something visible and explain how you made it.

---

## 3 Examples based on the game source code (look in /src)

1. Modularity & separation
   - Example A: src/player.js exports a Player class used by main.js — move player logic into its own file.
   - Example B: src/utils/collision.js contains checkCollision(a,b) used by many modules.
   - Example C: src/levels/level1.json or level module that stores enemy layouts separated from game logic.

2. Debugging & testing
   - Example A: console.log(player.x, player.y) to trace unexpected movement.
   - Example B: using debugger; inside a function to pause execution and inspect variables.
   - Example C: add simple assertions: console.assert(checkCollision(a,b) === expected, 'collision failed');

3. Performance & optimization
   - Example A: limit calls to draw() by only redrawing changed areas or capping FPS with requestAnimationFrame.
   - Example B: reuse bullet objects (object pool) instead of creating new ones each shot.
   - Example C: reduce collision checks by spatial partitioning (only check nearby enemies).

4. Version control & collaboration
   - Example A: git init; git add .; git commit -m "Initial game" to save a working state.
   - Example B: create feature branches for big changes (git checkout -b feature/powerups) and merge when ready.
   - Example C: use .gitignore to avoid committing node_modules or build artifacts.

---

## 3 Exercises (project & presentation)

1. Split a file into modules
   - Task: pick a large file (e.g., main.js) and move player-related functions into src/player.js. Update imports/exports and run the game.
   - Goal: practice modularity and fixing import errors.

2. Find and fix a bug, then write a test
   - Task: locate a reproducible bug (e.g., incorrect collision). Add console logs and a simple assertion to confirm the fix. Commit the fix with a clear message.
   - Goal: practice debugging and using Git commits.

3. Prepare a 3-minute presentation
   - Task: each student or pair prepares a 3-minute demo: goal, main feature, one challenge and next steps. Use the schedule to time presentations and feedback.
   - Goal: practice presenting clearly and receiving feedback.

---

## 3 Resources to continue learning
1. Pro Git book: https://git-scm.com/book/en/v2 — clear guide to version control and collaboration.
2. Chrome DevTools documentation & tutorials: https://developer.chrome.com/docs/devtools/ — debugging and performance tools.
3. Testing basics (Jest intro) or simple JS testing guides: https://jestjs.io/docs/getting-started or MDN testing guides.

---

## 3 Questions to answer in the presentation
1. Which part of your code would you extract into a separate module and why?
2. What was the hardest bug you found and how did you fix it?
3. How would you explain your game's core idea in one sentence to a judge?

---

## Notes for the instructor (short)
- Reserve time for student presentations and friendly feedback; use the schedule-hackathon.md to manage timing.
- Encourage short, frequent commits and descriptive messages so students can revert or show progress.
- Demonstrate DevTools briefly: setting breakpoints, inspecting variables, and profiling a slow frame.

<!-- end of presentation file -->
