export const RESIZE = 'RESIZE';
export const RESIZE_TEMP = 'RESIZE_TEMP';
export const PRESSED = 'PRESSED';
export const UNPRESSED = 'UNPRESSED';
export const RESIZE_DIRECTION = 'RESIZE_DIRECTION';
export const SET_SCROLL_OFFSETS = 'SET_SCROLL_OFFSETS';

export const HORIZONTAL = 'HORIZONTAL';
export const VERTICAL = 'VERTICAL';
export const DIAGONAL = 'DIAGONAL';

export function resize() {
  return {
    type: RESIZE
  };
}

export function resizeTemp(width, height) {
  return {
    type: RESIZE_TEMP,
    width,
    height
  };
}

export function press() {
  return {
    type: PRESSED
  };
}

export function unPress() {
  return {
    type: UNPRESSED
  };
}

export function setResizeDirection(resizeDirection) {
  return {
    type: RESIZE_DIRECTION,
    resizeDirection
  };
}

export function setScrollOffsets(scrollTop, scrollLeft) {
  return {
    type: SET_SCROLL_OFFSETS,
    scrollTop,
    scrollLeft
  };
}
