export const createCamera = (map, width, height) => {
  const camera = {
    x: 0,
    y: 0,
    width,
    height,
    maxX: map.cols * map.tsize - width,
    maxY: map.rows * map.tsize - height,
    following: null,
  };

  const follow = (sprite) => {
    camera.following = sprite;

    sprite.screenX = 0;
    sprite.screenY = 0;
  };

  const update = () => {
    // assume followed sprite should be placed at the center of the screen
    // whenever possible
    // state.following.screenX = state.width / 2;
    // state.following.screenY = state.height / 2;
    let screenX = camera.width / 2;
    let screenY = camera.height / 2;

    // make the camera follow the sprite
    camera.x = camera.following.x - camera.width / 2;
    camera.y = camera.following.y - camera.height / 2;
    // clamp values
    camera.x = Math.max(0, Math.min(camera.x, camera.maxX));
    camera.y = Math.max(0, Math.min(camera.y, camera.maxY));

    // in map corners, the sprite cannot be placed in the center of the screen
    // and we have to change its screen coordinates

    // left and right sides
    if (camera.following.x < camera.width / 2 ||
      camera.following.x > camera.maxX + camera.width / 2) {
      // state.following.screenX = state.following.x - state.x;
      screenX = camera.following.x - camera.x;
    }

    // top and bottom sides
    if (camera.following.y < camera.height / 2 ||
      camera.following.y > camera.maxY + camera.height / 2) {
      // state.following.screenY = state.following.y - state.y;
      screenY = camera.following.y - camera.y;
    }

    return {
      // x: camera.x,
      // y: camera.y,
      screenX,
      screenY
    };
  };


  // return {
  //   ...camera,
  //   follow,
  //   update
  // };

  camera.follow = follow;
  camera.update = update;

  return camera;
};
