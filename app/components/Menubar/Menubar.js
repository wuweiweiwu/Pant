// @flow
import React, { Component } from 'react';
import Menu from './Menu';
import styles from './Menubar.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openMenu, closeMenu, FILE, EDIT, VIEW, IMAGE, COLORS, HELP } from '../../actions/menu';

import { fileItems, editItems, viewItems, imageItems, colorItems, helpItems } from './items';

type Props = {
  active?: string,
  pressed: boolean,
  openMenu: string => void,
  closeMenu: () => void
};

class MenuBar extends Component<Props> {
  render() {
    const {
      active, pressed, openMenu, closeMenu
    } = this.props;

    return (
      <div className={styles.menubar}>
        <Menu
          title="&File"
          items={fileItems}
          isOpen={active === FILE}
          openMenu={() => openMenu(FILE)}
          closeMenu={closeMenu}
          pressed={pressed}
        />
        <Menu
          title="&Edit"
          items={editItems}
          isOpen={active === EDIT}
          openMenu={() => openMenu(EDIT)}
          closeMenu={closeMenu}
          pressed={pressed}
        />
        <Menu
          title="&View"
          items={viewItems}
          isOpen={active === VIEW}
          openMenu={() => openMenu(VIEW)}
          closeMenu={closeMenu}
          pressed={pressed}
        />
        <Menu
          title="&Image"
          items={imageItems}
          isOpen={active === IMAGE}
          openMenu={() => openMenu(IMAGE)}
          closeMenu={closeMenu}
          pressed={pressed}
        />
        <Menu
          title="&Colors"
          items={colorItems}
          isOpen={active === COLORS}
          openMenu={() => openMenu(COLORS)}
          closeMenu={closeMenu}
          pressed={pressed}
        />
        <Menu
          title="&Help"
          items={helpItems}
          isOpen={active === HELP}
          openMenu={() => openMenu(HELP)}
          closeMenu={closeMenu}
          pressed={pressed}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pressed: state.menu.pressed,
    active: state.menu.active
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openMenu, closeMenu }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
