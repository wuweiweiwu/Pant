import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './Statusbar.scss';

class Statusbar extends Component {
  render() {
    return (
      <div className={styles.statusbar}>
        <div className={styles.statusbar__status} />
        <div className={styles.statusbar__coordinates} />
        <div className={styles.statusbar__coordinates} />
      </div>
    );
  }
}

export default Statusbar;
