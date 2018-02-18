import {
  RESIZE,
  PRESSED,
  UNPRESSED,
  RESIZE_DIRECTION,
  DIAGONAL,
  CANCEL_RESIZE
} from '../actions/canvas';

const init = {
  width: 200,
  height: 200,
  tempWidth: 200,
  tempHeight: 200,
  pressed: false,
  resizeDirection: DIAGONAL
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case RESIZE:
      return {
        ...state,
        tempWidth: action.width,
        tempHeight: action.height
      };
    case PRESSED:
      return {
        ...state,
        pressed: true
      };
    case UNPRESSED:
      return {
        ...state,
        width: state.tempWidth,
        height: state.tempHeight,
        pressed: false
      };
    case RESIZE_DIRECTION:
      return {
        ...state,
        resizeDirection: action.resizeDirection
      };
    case CANCEL_RESIZE:
      return {
        ...state,
        tempWidth: state.width,
        tempHeight: state.height,
        pressed: false
      };
    default:
      return state;
  }
}
