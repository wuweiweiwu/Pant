// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import Popup from './Popup';

import styles from './Menu.scss';

export function embedHotkey(str: string) {
  const arr = [];
  arr.push(str.split('&')[0]);

  let hotkey = null;
  const index = str.indexOf('&');
  if (index >= 0) {
    hotkey = str[index + 1];
  }
  arr.push(hotkey ? (
    <span className={styles.menu__hotkey} key={uuid()}>
      {hotkey}
    </span>
  ) : null);

  const second = str.split('&')[1];
  arr.push(second ? second.substring(1) : null);

  return arr;
}

export type Item =
  | {
      item: string,
      shortcut?: string,
      disabled?: boolean,
      checkbox?: boolean,
      description?: string,
      submenu?: Array<Item>
    }
  | string;

type Props = {
  title: string,
  items: Array<Item>,
  pressed?: boolean,
  isOpen: boolean,
  openMenu: () => void,
  closeMenu: () => void
};

class Menu extends Component<Props> {
  render() {
    const {
      title, items, pressed, isOpen, openMenu, closeMenu
    } = this.props;

    return (
      <div className={styles.menu__container}>
        <div
          role="button"
          tabIndex={0}
          className={classNames({
            [styles.menu__button]: true,
            [styles['menu__button--active']]: isOpen
          })}
          onMouseOver={() => {
            if (pressed && !isOpen) {
              openMenu();
            }
          }}
          onClick={() => {
            if (isOpen) {
              closeMenu();
            } else {
              openMenu();
            }
          }}
        >
          {embedHotkey(title)}
        </div>
        <Popup items={items} isOpen={isOpen} />
      </div>
    );
  }
}

export default Menu;
