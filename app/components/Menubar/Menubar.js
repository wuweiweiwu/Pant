// @flow
import React, { Component } from 'react';
import uuid from 'uuid/v1';

import Menu from './Menu';
import styles from './Menubar.scss';
import { menus } from './menus';

type Props = {};

type State = {
  pressed: boolean,
  menuIndex: number
};

class MenuBar extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      pressed: false,
      menuIndex: 0
    };
    (this: any).closeMenu = this.closeMenu.bind(this);
  }

  openMenu(index: number) {
    this.setState({
      menuIndex: index,
      pressed: true
    });
  }

  closeMenu() {
    this.setState({
      pressed: false
    });
  }

  render() {
    const { menuIndex, pressed } = this.state;

    return (
      <div className={styles.menubar}>
        {menus.map((menuDef, index) => (
          <Menu
            key={uuid()}
            def={menuDef}
            pressed={pressed}
            isCurrent={menuIndex === index}
            closeMenu={this.closeMenu}
            openMenu={this.openMenu.bind(this, index)}
          />
        ))}
      </div>
    );
  }
}

export default MenuBar;
