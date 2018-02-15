import { FOCUS_MENU, LEAVE_MENU, FILE, EDIT } from '../actions/menu';

const INIT = { file: false, edit: false, active: false };

export default function reducer(state = INIT, action) {
  switch (action.type) {
    case FOCUS_MENU:
      switch (action.menu) {
        case FILE:
          return {
            ...state,
            active: true,
            edit: false,
            file: true
          };
        case EDIT:
          return {
            ...state,
            active: true,
            edit: true,
            file: false
          };
        default:
          return state;
      }
    case LEAVE_MENU:
      return INIT;
    default:
      return state;
  }
}
