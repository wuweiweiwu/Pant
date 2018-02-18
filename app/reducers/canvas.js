import {
  RESIZE,
  RESIZE_TEMP,
  PRESSED,
  UNPRESSED,
  RESIZE_DIRECTION,
  DIAGONAL,
  SET_SCROLL_OFFSETS
} from '../actions/canvas';

const init = {
  width: 200,
  height: 200,
  tempWidth: 200,
  tempHeight: 200,
  pressed: false,
  resizeDirection: DIAGONAL,
  scrollLeft: 0,
  scrollTop: 0
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case RESIZE:
      return {
        ...state,
        width: state.tempWidth,
        height: state.tempHeight
      };
    case RESIZE_TEMP:
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
        pressed: false
      };
    case RESIZE_DIRECTION:
      return {
        ...state,
        resizeDirection: action.resizeDirection
      };
    case SET_SCROLL_OFFSETS:
      return {
        ...state,
        scrollLeft: action.scrollLeft,
        scrollTop: action.scrollTop
      };
    default:
      return state;
  }
}
