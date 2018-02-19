// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import Popup from './Popup';

import styles from './Menu.scss';
import { embedHotkey } from '../../utils/utils';
import { type Item } from './items';

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
