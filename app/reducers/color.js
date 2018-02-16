import {
  CHANGE_PRIMARY,
  CHANGE_SECONDARY,
  CHANGE_TERTIARY,
  CHANGE_PALETTE,
  SWAP_PRIMARY_SECONDARY
} from '../actions/color';

const palette = [
  '#000000',
  '#787878',
  '#790300',
  '#757A01',
  '#007902',
  '#007778',
  '#0A0078',
  '#7B0077',
  '#767A38',
  '#003637',
  '#286FFE',
  '#083178',
  '#4C00FE',
  '#783B00',
  '#FFFFFF',
  '#BBBBBB',
  '#FF0E00',
  '#FAFF08',
  '#00FF0B',
  '#00FEFF',
  '#3400FE',
  '#FF00FE',
  '#FBFF7A',
  '#00FF7B',
  '#76FEFF',
  '#8270FE'
  // '#FF0677',
  // '#FF7D36'
];

const init = {
  primary: 'black',
  secondary: 'white',
  tertiary: undefined,
  palette
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
    case CHANGE_PALETTE:
      return {
        ...state,
        palette: Object.assign([], state.palette, { [action.index]: action.color })
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
