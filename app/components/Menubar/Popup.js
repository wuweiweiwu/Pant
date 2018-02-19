// @flow
import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v1';
import classNames from 'classnames';

import { type Item } from './items';
import styles from './Popup.scss';
import { DIVIDER } from './items';

import { embedHotkey } from '../../utils/utils';

type Props = {
  items: Array<Item>,
  isOpen?: boolean,
  nested?: boolean
};

class Popup extends Component<Props> {
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
              if (typeof item !== 'string') {
                return (
                  <tr className={styles.menu__item} key={uuid()} disabled={item.disabled}>
                    <td className={styles.menu__item__checkbox}>{item.checkbox && '✓'}</td>
                    <td className={styles.menu__item__label}>{embedHotkey(item.item)}</td>
                    <td className={styles.menu__item__shortcut}>{item.shortcut}</td>
                    <td className={styles.menu__item__submenu}>
                      {item.submenu && (
                        <Fragment>
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
                        </Fragment>
                      )}
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={uuid()}>
                  <td colSpan={4}>
                    <hr className={styles.menu__divider} />
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
