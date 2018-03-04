import {
  START_MOVING_WINDOW,
  STOP_MOVING_WINDOW,
  MOVE_WINDOW,
  SHOW_WINDOW,
  HIDE_WINDOW,
  DOCK_COLOR_WINDOW
} from '../actions/window';

const init = {
  moving: false,
  offsetX: 0,
  offsetY: 0,
  currentX: 0,
  currentY: 0,

  colorWindow: false,
  colorDock: 1 // -1 for top, 1 for bottom
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case START_MOVING_WINDOW:
      return {
        ...state,
        moving: true,
        offsetX: action.x,
        offsetY: action.y
      };
    case STOP_MOVING_WINDOW:
      return {
        ...state,
        moving: false
      };
    case MOVE_WINDOW:
      return {
        ...state,
        currentX: action.x,
        currentY: action.y
      };
    case SHOW_WINDOW:
      if (action.window === 'color')
        return {
          ...state,
          colorWindow: true
        };
    case HIDE_WINDOW:
      if (action.window === 'color')
        return {
          ...state,
          colorWindow: false
        };
    case DOCK_COLOR_WINDOW:
      return {
        ...state,
        colorDock: action.dock
      };
    default:
      return state;
  }
}
