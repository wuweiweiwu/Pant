import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './Canvas.scss';

class Canvas extends Component {
  render() {
    return (
      <div className={styles.canvas__area}>
        <canvas />
      </div>
    );
  }
}

export default Canvas;
