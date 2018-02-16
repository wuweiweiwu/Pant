import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './ColorCell.scss';

class ColorCell extends Component {
  componentDidMount() {
    const { color, onContextMenu, onDoubleClick } = this.props;

    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 13, 13);
    }

    if (this.div) {
      // right click and control click handler
      this.div.addEventListener('contextmenu', onContextMenu);

      // double click handler
      if (onDoubleClick) {
        this.div.addEventListener('dblclick', onDoubleClick);
      }
    }
  }

  componentDidUpdate() {
    const { color } = this.props;

    if (this.canvas) {
      const ctx = this.canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 13, 13);
    }
  }

  render() {
    const {
      style, picker, onClick, color
    } = this.props;

    return (
      <div
        className={classNames({ [styles.picker__cell]: picker, [styles.palette__cell]: !picker })}
        style={style}
        onClick={onClick}
        ref={div => (this.div = div)}
      >
        <canvas ref={cv => (this.canvas = cv)} height="13px" width="13px" />
      </div>
    );
  }
}

export default ColorCell;
