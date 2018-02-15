// @flow

export const FILE = 'FILE';
export const EDIT = 'EDIT';

export const FOCUS_MENU = 'FOCUS_MENU';
export const LEAVE_MENU = 'LEAVE_MENU';

export function openMenu(menu: string) {
  return {
    type: FOCUS_MENU,
    menu
  };
}

export function closeMenu() {
  return {
    type: LEAVE_MENU
  };
}
