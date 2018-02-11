// @flow

export const FILE = 'FILE';
export const EDIT = 'EDIT';

export const FOCUS_FILE = 'FOCUS_FILE';
export const FOCUS_EDIT = 'FOCUS_EDIT';

export const LEAVE_MENU = 'LEAVE_MENU';

export function openMenu(menu: string) {
  switch (menu) {
    case FILE:
      return { type: FOCUS_FILE };
    case EDIT:
      return { type: FOCUS_EDIT };
    default:
      return { type: FOCUS_FILE };
  }
}

export function closeMenu() {
  return {
    type: LEAVE_MENU
  };
}
