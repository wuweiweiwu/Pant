export const RESIZE = 'RESIZE';

export function resize(x, y) {
  return {
    type: RESIZE,
    x,
    y
  };
}
