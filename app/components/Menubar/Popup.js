import React, { Component } from 'react';
import uuid from 'uuid/v1';
import classNames from 'classnames';

import { embedHotkey } from './Menu';
import styles from './Menu.scss';
import { DIVIDER } from './items';

class Popup extends Component {
  render() {
    const { items, isOpen, nested } = this.props;

    return (
      <div
        className={classNames({
          [styles.menu__popup]: true,
          [styles['menu__popup--disabled']]: !isOpen && !nested,
          [styles['menu__popup--nested']]: nested
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
                  <td className={styles.menu__item__checkbox}>{item.checkbox && '✓'}</td>
                  <td className={styles.menu__item__label}>{embedHotkey(item.item)}</td>
                  <td className={styles.menu__item__shortcut}>{item.shortcut}</td>
                  <td className={styles.menu__item__submenu}>
                    {item.submenu && (
                      <React.Fragment>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="11"
                          viewBox="0 0 10 11"
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'middle'
                          }}
                        >
                          <path d="M7.5 4.33L0 8.66L0 0z" />
                        </svg>
                        <Popup items={item.submenu} nested />
                      </React.Fragment>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Popup;
