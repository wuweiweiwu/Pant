import { FOCUS_MENU, LEAVE_MENU } from '../actions/menu';

const init = {
  active: undefined,

  // menu is pressed
  pressed: false
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case FOCUS_MENU:
      return {
        ...state,
        active: action.menu,
        pressed: true
      };
    case LEAVE_MENU:
      return init;
    default:
      return state;
  }
}
