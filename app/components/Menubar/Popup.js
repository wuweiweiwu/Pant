// @flow
import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v1';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { type Item } from './menus';
import styles from './Popup.scss';
import { DIVIDER } from './menus';
import { embedHotkey } from '../../utils/utils';
import { toggleCheckbox } from '../../actions/menu';

type Props = {
  items: Array<Item>,
  isOpen?: boolean,
  nested?: boolean,

  tool: boolean,
  color: boolean,
  status: boolean,
  text: boolean,
  extras: boolean,
  grid: boolean,
  thumbnail: boolean,
  opaque: boolean,

  toggleCheckbox?: any => void
};

class Popup extends Component<Props> {
  render() {
    const { items, isOpen, nested, toggleCheckbox, ...rest } = this.props;

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
            {items.map((item: Item) => {
              if (typeof item !== 'string') {
                return (
                  <tr
                    className={styles.menu__item}
                    key={uuid()}
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.checkbox && toggleCheckbox) {
                        toggleCheckbox(item.checkbox);
                      }
                    }}
                  >
                    <td className={styles.menu__item__checkbox}>
                      {item.checkbox && this.props[item.checkbox] && '✓'}
                    </td>
                    <td className={styles.menu__item__label}>
                      {embedHotkey(item.item)}
                    </td>
                    <td className={styles.menu__item__shortcut}>
                      {item.shortcut}
                    </td>
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
                          <Popup
                            items={item.submenu}
                            nested
                            toggleCheckbox={toggleCheckbox}
                            {...rest}
                          />
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

function mapStateToProps(state) {
  return {
    tool: state.menu.tool,
    color: state.menu.color,
    status: state.menu.status,
    text: state.menu.text,
    extras: state.menu.extras,
    grid: state.menu.grid,
    thumbnail: state.menu.thumbnail,
    opaque: state.menu.opaque
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleCheckbox }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
