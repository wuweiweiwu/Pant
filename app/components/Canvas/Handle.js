// @flow
import React, { Component } from 'react';
import classNames from 'classnames';

import styles from './Handle.scss';

type Props = {
  x: number,
  y: number,
  useless?: boolean,
  pressed?: boolean,
  cursor?: string,
  onMouseDown?: Event => void
};

class Handle extends Component<Props> {
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
