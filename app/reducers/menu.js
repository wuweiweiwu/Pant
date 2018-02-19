import { TOGGLE_CHECKBOX } from '../actions/menu';

const init = {
  tool: true,
  color: true,
  status: true,
  text: true,
  extras: false,
  grid: false,
  thumbnail: false,
  opaque: false
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case TOGGLE_CHECKBOX:
      return {
        ...state,
        [action.target]: !state[action.target]
      };
    default:
      return state;
  }
}
