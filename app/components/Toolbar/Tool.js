import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import styles from './Tool.scss';

class Tool extends Component {
  render() {
    const { offsetX, offsetY } = this.props;

    return (
      <div className={styles.tool}>
        <span
          style={{
            display: 'block',
            position: 'absolute',
            left: 0,
            top: 0,
            width: 24,
            height: 24,
            backgroundImage: `url(${require('../../images/toolbar-icons.png')})`,
            backgroundPosition: `${offsetX}px ${-offsetY}px`
          }}
        />
      </div>
    );
  }
}

export default Tool;
