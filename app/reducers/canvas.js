import { RESIZE } from '../actions/canvas';

const init = {
  x: 200,
  y: 200,
  tempX: 200,
  tempY: 200
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case RESIZE:
      return {
        ...state,
        x: action.x,
        y: action.y,
        tempX: action.x,
        tempY: action.y
      };
    default:
      return state;
  }
}
