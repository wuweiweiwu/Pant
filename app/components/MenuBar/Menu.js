import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

export const DIVIDER = 'DIVIDER';

import styles from './Menu.css';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    const { title, items } = this.props;
    const { open } = this.state;

    const firstPart = str => str.split('&')[0];

    const hotkey = str => {
      const index = str.indexOf('&');
      if (index >= 0) {
        return str[index + 1];
      }
      return null;
    };

    const secondPart = str => {
      const split = str.split('&')[1];
      if (!split || split.length === 0) {
        return '';
      }
      return split.substring(1);
    };

    return (
      <div className={styles.menu__container}>
        <div
          className={classNames({
            [styles.menu__button]: true,
            [styles['menu__button--active']]: open
          })}
          onClick={this.togglePopup}
        >
          {title}
        </div>
        <div
          className={classNames({
            [styles.menu__popup]: true,
            [styles['menu__popup--disabled']]: !open
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
                  <tr className={styles.menu__item} key={uuid()}>
                    <td className={styles.menu__item__checkbox} />
                    <td className={styles.menu__item__label}>
                      {firstPart(item.item)}
                      {hotkey(item.item) && (
                        <span className={styles.menu__hotkey}>{hotkey(item.item)}</span>
                      )}
                      {secondPart(item.item)}
                    </td>
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
