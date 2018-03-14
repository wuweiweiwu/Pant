export const START_MOVING_WINDOW = 'START_MOVING_WINDOW';
export const STOP_MOVING_WINDOW = 'STOP_MOVING_WINDOW';
export const MOVE_WINDOW = 'MOVE_WINDOW';

export function startMoving(x, y) {
  return {
    type: START_MOVING_WINDOW,
    x,
    y
  };
}

export function stopMoving() {
  return {
    type: STOP_MOVING_WINDOW
  };
}

export function moveWindow(x, y) {
  return {
    type: MOVE_WINDOW,
    x,
    y
  };
}
