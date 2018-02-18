import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Handle.scss';

class Handle extends Component {
  render() {
    const {
      x, y, useless, cursor, pressed, onMouseDown
    } = this.props;

    const style = {
      top: `${y}px`,
      left: `${x}px`,
      cursor: !!cursor && cursor
    };

    return (
      <div
        className={classNames({
          [styles.handle]: true,
          [styles['handle--useless']]: useless
        })}
        style={style}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export default Handle;
