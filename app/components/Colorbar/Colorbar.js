import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './Colorbar.scss';

class Colorbar extends Component {
  componentDidMount() {
    if (!this.primary) return;

    const ctx1 = this.primary.getContext('2d');
    ctx1.fillStyle = 'black';
    ctx1.fillRect(0, 0, 13, 13);

    if (!this.secondary) return;
    const ctx2 = this.secondary.getContext('2d');
    ctx2.fillStyle = 'white';
    ctx2.fillRect(0, 0, 13, 13);
  }

  render() {
    return (
      <div className={styles.colorbar}>
        <div className={styles.colorbar__switcher}>
          <canvas height="28px" width="29px" />
          <div
            className={styles.colorbar__cell}
            style={{
              position: 'absolute',
              right: '3px',
              bottom: '3px'
            }}
          >
            <canvas ref={cv => (this.secondary = cv)} height="13px" width="13px" />
          </div>
          <div
            className={styles.colorbar__cell}
            style={{
              position: 'absolute',
              left: '2px',
              top: '4px'
            }}
          >
            <canvas ref={cv => (this.primary = cv)} height="13px" width="13px" />
          </div>
        </div>
      </div>
    );
  }
}

export default Colorbar;
