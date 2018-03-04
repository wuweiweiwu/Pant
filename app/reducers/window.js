import {
  START_MOVING_WINDOW,
  STOP_MOVING_WINDOW,
  MOVE_WINDOW,
  SHOW_WINDOW,
  HIDE_WINDOW
} from '../actions/window';

const init = {
  moving: false,
  offsetX: 0,
  offsetY: 0,
  currentX: 0,
  currentY: 0,

  colorWindow: false
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
    default:
      return state;
  }
}
