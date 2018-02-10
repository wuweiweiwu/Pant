import React, { Component } from 'react';

import Menu from './Menu';

import styles from './MenuBar.css';

export default class MenuBar extends Component {
  render() {
    return (
      <div className={styles['menu-bar']}>
        <Menu />
      </div>
    );
  }
}
