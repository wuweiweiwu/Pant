import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './ColorCell.scss';

class ColorCell extends Component {
  componentDidMount() {
    const { color } = this.props;
    if (!this.canvas) return;

    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 13, 13);
  }
  render() {
    const { style, picker } = this.props;

    return (
      <div
        className={classNames({ [styles.picker__cell]: picker, [styles.palette__cell]: !picker })}
        style={style}
      >
        <canvas ref={cv => (this.canvas = cv)} height="13px" width="13px" />
      </div>
    );
  }
}

export default ColorCell;
