import {
  START_MOVING_WINDOW,
  STOP_MOVING_WINDOW,
  MOVE_WINDOW
} from '../actions/window';

const init = {
  moving: false,
  offsetX: 0,
  offsetY: 0,
  currentX: 0,
  currentY: 0
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
    default:
      return state;
  }
}
