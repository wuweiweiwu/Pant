export const START_MOVING_WINDOW = 'START_MOVING_WINDOW';
export const STOP_MOVING_WINDOW = 'STOP_MOVING_WINDOW';
export const MOVE_WINDOW = 'MOVE_WINDOW';

export const SHOW_WINDOW = 'SHOW_WINDOW';
export const HIDE_WINDOW = 'HIDE_WINDOW';

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

export function showWindow(win) {
  return {
    type: SHOW_WINDOW,
    window: win
  };
}

export function hideWindow(win) {
  return {
    type: HIDE_WINDOW,
    window: win
  };
}
