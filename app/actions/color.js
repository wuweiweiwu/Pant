export const CHANGE_PRIMARY = 'CHANGE_PRIMARY';
export const CHANGE_SECONDARY = 'CHANGE_SECONDARY';
export const CHANGE_TERTIARY = 'CHANGE_TERTIARY';
export const CHANGE_PALETTE = 'CHANGE_PALETTE';
export const SWAP_PRIMARY_SECONDARY = 'SWAP_PRIMARY_SECONDARY';

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

export function changePalette(index, color) {
  return {
    type: CHANGE_PALETTE,
    index,
    color
  };
}

export function swapPrimarySecondary() {
  return {
    type: SWAP_PRIMARY_SECONDARY
  };
}
