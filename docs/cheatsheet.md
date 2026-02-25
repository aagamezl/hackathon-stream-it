# Student Cheat Sheet — Quick JS and Canvas snippets

This short sheet has the tiny code snippets students will need during the workshop.

If / Else

```javascript
if (condition) {
  // runs when condition is true
} else {
  // runs when condition is false
}
```

For loop

```javascript
for (let i = 0; i < 10; i++) {
  // repeated 10 times
}
```

Function

```javascript
function add(a, b) {
  return a + b
}

// arrow function
const mul = (a, b) => a * b
```

Drawing text on canvas

```javascript
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.font = '16px sans-serif'
ctx.fillText('Hello', 10, 20)
```

Rounding coordinates for crisp lines

```javascript
ctx.moveTo(Math.round(x), Math.round(y))
```

Access grid tile (row/col -> index)

```javascript
const idx = row * cols + col
const tile = layers[layer][idx]
```

Keyboard check (with provided API)

```javascript
if (keyboard.isDown(KEYBOARD.LEFT)) {
  // move left
}
```
