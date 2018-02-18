export const RESIZE = 'RESIZE';
export const PRESSED = 'PRESSED';
export const UNPRESSED = 'UNPRESSSED';
export const RESIZE_DIRECTION = 'RESIZE_DIRECTION';
export const CANCEL_RESIZE = 'CANCEL_RESIZE';

export const HORIZONTAL = 'HORIZONTAL';
export const VERTICAL = 'VERTICAL';
export const DIAGONAL = 'DIAGONAL';

export function resize(width, height) {
  return {
    type: RESIZE,
    width,
    height
  };
}

export function cancelResize() {
  return {
    type: CANCEL_RESIZE
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
