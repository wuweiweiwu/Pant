import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './Colorbar.scss';

class Colorbar extends Component {
  render() {
    return (
      <div className={styles.colorbar}>
        <div
          className={classNames(styles.swatch, styles['current-colors'])}
          style={{ position: 'relative' }}
        >
          <canvas style={{ pointerEvents: 'none' }} width="28" height="29" />
          <div
            className={classNames(styles.swatch, styles['color-selection'])}
            style={{ position: 'absolute', right: '3px', bottom: '3px' }}
          >
            <canvas style={{ pointerEvents: 'none' }} width="13" height="13" />
          </div>
          <div
            className={classNames(styles.swatch, styles['color-selection'])}
            style={{ position: 'absolute', left: '2px', top: '4px' }}
          >
            <canvas style={{ pointerEvents: 'none' }} width="13" height="13" />
          </div>
        </div>
      </div>
    );
  }
}

export default Colorbar;
