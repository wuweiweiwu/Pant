// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import Popup from './Popup';

import styles from './Menu.scss';
import { embedHotkey } from '../../utils/utils';
import { type MenuDef } from './menus';

type Props = {
  def: MenuDef,
  pressed?: boolean,
  isCurrent: boolean,
  openMenu: () => void,
  closeMenu: () => void
};

class Menu extends Component<Props> {
  render() {
    const { def, pressed, isCurrent, openMenu, closeMenu } = this.props;

    return (
      <div className={styles.menu__container}>
        <div
          role="button"
          tabIndex={0}
          className={classNames({
            [styles.menu__button]: true,
            [styles['menu__button--active']]: isCurrent && pressed
          })}
          onMouseOver={() => {
            if (pressed && !isCurrent) {
              openMenu();
            }
          }}
          onClick={() => {
            if (!pressed) {
              openMenu();
            } else {
              closeMenu();
            }
          }}
        >
          {embedHotkey(Object.keys(def)[0])}
        </div>
        <Popup
          items={def[Object.keys(def)[0]]}
          isOpen={isCurrent && pressed}
          closeMenu={closeMenu}
        />
      </div>
    );
  }
}

export default Menu;
