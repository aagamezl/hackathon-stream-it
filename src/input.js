// Keyboard constants
export const KEYBOARD = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40
};

// Create keyboard state
export const createKeyboard = (keys) => {
  const state = keys.reduce((obj, key) => {
    obj[key] = false;
    return obj;
  }, {});

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode;

    if (keyCode in state) {
      event.preventDefault();
      state[keyCode] = true;
    }
  };

  const handleKeyUp = (event) => {
    const keyCode = event.keyCode;

    if (keyCode in state) {
      event.preventDefault();
      state[keyCode] = false;
    }
  }

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
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
  };
};
