# Solution: Keyboard SPACE debounce

Teacher example to toggle debug on space press (rising edge):

```javascript
// inside update loop
if (state.keyboard.isDown(KEYBOARD.SPACE) && !state.spaceWasDown) {
  state.debug = !state.debug
}
state.spaceWasDown = state.keyboard.isDown(KEYBOARD.SPACE)
```
