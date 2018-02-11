import { FOCUS_EDIT, FOCUS_FILE, LEAVE_MENU } from '../actions/menuBar';

const INIT = { file: false, edit: false, active: false };

export default function reducer(state = INIT, action) {
  switch (action.type) {
    case FOCUS_FILE:
      return {
        ...state,
        active: true,
        edit: false,
        file: true
      };
    case FOCUS_EDIT:
      return {
        ...state,
        active: true,
        edit: true,
        file: false
      };
    case LEAVE_MENU:
      return INIT;
    default:
      return state;
  }
}
