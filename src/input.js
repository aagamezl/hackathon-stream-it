export const KEYBOARD = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  SPACE: "Space", // STUDENT TASK: use this to toggle debug mode (debounced)
};

export const DIRECTIONS = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
};

// Create keyboard state
export const createKeyboard = (keys) => {
  const state = keys.reduce((keysMap, key) => {
    keysMap[key] = false;

    return keysMap;
  }, {});

  const handleKeyDown = (event) => {
    const keyCode = event.code;

    if (keyCode in state) {
      event.preventDefault();

      state[keyCode] = true;
    }
  };

  const handleKeyUp = (event) => {
    const keyCode = event.code;

    if (keyCode in state) {
      event.preventDefault();
      state[keyCode] = false;
    }
  };

  const isDown = (keyCode) => {
    if (!(keyCode in state)) {
      throw new Error(`Keycode ${keyCode} is not being listened to`);
    }

    return state[keyCode];
  };

  return {
    state,
    handleKeyDown,
    handleKeyUp,
    isDown,
    listen: () => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    },
  };
};
