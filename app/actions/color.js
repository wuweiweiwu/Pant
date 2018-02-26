export const CHANGE_PRIMARY = 'CHANGE_PRIMARY';
export const CHANGE_SECONDARY = 'CHANGE_SECONDARY';
export const CHANGE_TERTIARY = 'CHANGE_TERTIARY';
export const SWAP_PRIMARY_SECONDARY = 'SWAP_PRIMARY_SECONDARY';

export const CHANGE_PALETTE_INDEX = 'CHANGE_PALETTE_INDEX';
export const CHANGE_PALETTE = 'CHANGE_PALETTE';

export const SET_MARGIN_LEFT = 'SET_MARGIN_LEFT';

export function changePrimary(color) {
  return {
    type: CHANGE_PRIMARY,
    color
  };
}

export function changeSecondary(color) {
  return {
    type: CHANGE_SECONDARY,
    color
  };
}
export function changeTertiary(color) {
  return {
    type: CHANGE_TERTIARY,
    color
  };
}

export function swapPrimarySecondary() {
  return {
    type: SWAP_PRIMARY_SECONDARY
  };
}

export function changePaletteIndex(index) {
  return {
    type: CHANGE_PALETTE_INDEX,
    index
  };
}

export function changePalette(color) {
  return {
    type: CHANGE_PALETTE,
    color
  };
}

export function setMarginLeft(marginLeft) {
  return {
    type: SET_MARGIN_LEFT,
    marginLeft
  };
}
