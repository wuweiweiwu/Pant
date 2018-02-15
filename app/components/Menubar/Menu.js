import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

export const DIVIDER: string = 'DIVIDER';

import styles from './Menu.scss';

type item =
  | {
      item: string,
      shortcut?: string,
      description: string,
      disabled?: boolean
    }
  | string;

type Props = {
  closeMenu: () => void,
  openMenu: () => void,
  title: string,
  activeMenu: boolean,
  isOpen: boolean,
  items: Array<item>
};

class Menu extends Component<Props> {
  render() {
    const {
      title, items, activeMenu, isOpen, openMenu, closeMenu
    } = this.props;

    const embedHotkey = (str: string) => {
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
    };

    return (
      <div className={styles.menu__container}>
        <div
          className={classNames({
            [styles.menu__button]: true,
            [styles['menu__button--active']]: isOpen
          })}
          onMouseOver={() => {
            if (activeMenu && !isOpen) {
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
        <div
          className={classNames({
            [styles.menu__popup]: true,
            [styles['menu__popup--disabled']]: !isOpen
          })}
        >
          <table className={styles.menu__popup__table}>
            <tbody>
              {items.map(item => {
                if (item === DIVIDER) {
                  return (
                    <tr key={uuid()}>
                      <td colSpan={4}>
                        <hr className={styles.menu__divider} />
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr className={styles.menu__item} key={uuid()} disabled={item.disabled}>
                    <td className={styles.menu__item__checkbox} />
                    <td className={styles.menu__item__label}>{embedHotkey(item.item)}</td>
                    <td className={styles.menu__item__shortcut}>{item.shortcut}</td>
                    <td className={styles.menu__item__submenu} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenu: state.menu.active
  };
}

export default connect(mapStateToProps, undefined)(Menu);
