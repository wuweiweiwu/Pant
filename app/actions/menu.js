export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';

export function toggleCheckbox(target) {
  return {
    type: TOGGLE_CHECKBOX,
    target
  };
}
