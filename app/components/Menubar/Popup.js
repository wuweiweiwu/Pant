// @flow
import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v1';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { type Item } from './menus';
import styles from './Popup.scss';
import { DIVIDER } from './menus';
import { embedHotkey, getSiblings } from '../../utils/utils';
import { toggleCheckbox } from '../../actions/menu';

type Props = {
  items: Array<Item>,
  isOpen?: boolean,
  nested?: boolean,
  closeMenu: () => void,

  tool: boolean,
  color: boolean,
  status: boolean,
  text: boolean,
  extras: boolean,
  grid: boolean,
  thumbnail: boolean,
  opaque: boolean,

  toggleCheckbox: any => void,

  onLeaveDiv?: () => void,
  onEnterDiv?: () => void
};

type State = {
  popupOpen: boolean,
  inMain: boolean,
  inNested: boolean
};

class Popup extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false,
      inMain: false,
      inNested: false
    };
  }

  // get rid of the flashes in rendering
  shouldComponentUpdate(nextProps, nextState) {
    if (
      _.isEqual(this.state, {
        popupOpen: true,
        inMain: true,
        inNested: true
      }) &&
      _.isEqual(nextState, {
        popupOpen: true,
        inMain: true,
        inNested: false
      })
    ) {
      return false;
    }
    return true;
  }

  render() {
    const {
      items,
      isOpen,
      nested,
      toggleCheckbox,
      closeMenu,
      onLeaveDiv,
      onEnterDiv,
      ...rest
    } = this.props;
    const { popupOpen, inMain, inNested } = this.state;

    return (
      <div
        className={classNames({
          [styles.menu__popup]: true,
          [styles['menu__popup--disabled']]: !isOpen && !nested,
          [styles['menu__popup--nested']]: nested
        })}
        onMouseEnter={() => {
          if (onEnterDiv) {
            onEnterDiv();
          } else {
            this.setState({
              inMain: true
            });
          }
        }}
        onMouseLeave={() => {
          if (onLeaveDiv) {
            onLeaveDiv();
          } else {
            this.setState({
              inMain: false
            });
          }
        }}
      >
        <table className={styles.menu__popup__table}>
          <tbody>
            {items.map((item: Item) => {
              if (typeof item !== 'string') {
                return (
                  <tr
                    key={uuid()}
                    className={classNames({
                      [styles.menu__item]: true,
                      [styles['menu__item--highlight']]:
                        popupOpen &&
                        item.submenu &&
                        ((inMain && inNested) || (!inMain && !inNested))
                    })}
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.disabled) {
                        return;
                      }
                      if (item.checkbox && toggleCheckbox) {
                        toggleCheckbox(item.checkbox);
                        closeMenu();
                      }
                    }}
                    onMouseOver={() => {
                      if (item.submenu && !popupOpen) {
                        this.setState({ popupOpen: true });
                      }
                      if (!item.submenu && popupOpen) {
                        this.setState({ popupOpen: false });
                      }
                    }}
                    onMouseLeave={e => {
                      if (item.submenu && popupOpen && inMain && !inNested) {
                        this.setState({ popupOpen: false });
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
                          {popupOpen && (
                            <Popup
                              nested
                              items={item.submenu}
                              toggleCheckbox={toggleCheckbox}
                              closeMenu={closeMenu}
                              onEnterDiv={() => {
                                this.setState({
                                  inNested: true
                                });
                              }}
                              onLeaveDiv={() => {
                                this.setState({
                                  inNested: false
                                });
                              }}
                              {...rest}
                            />
                          )}
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
