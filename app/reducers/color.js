import {
  CHANGE_PRIMARY,
  CHANGE_SECONDARY,
  CHANGE_TERTIARY,
  SWAP_PRIMARY_SECONDARY
} from "../actions/color";

const init = {
  primary: "black",
  secondary: "white",
  tertiary: "rgba(0, 0, 0, 0)"
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case CHANGE_PRIMARY:
      return {
        ...state,
        primary: action.color
      };
    case CHANGE_SECONDARY:
      return {
        ...state,
        secondary: action.color
      };
    case CHANGE_TERTIARY:
      return {
        ...state,
        tertiary: action.color
      };
    case SWAP_PRIMARY_SECONDARY:
      return {
        ...state,
        primary: state.secondary,
        secondary: state.primary
      };
    default:
      return state;
  }
}
