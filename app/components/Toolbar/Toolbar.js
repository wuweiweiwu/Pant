import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import Tool from './Tool';
import { tools } from './tools';

import styles from './Toolbar.scss';

class ToolBox extends Component {
  render() {
    const getCursor = cursor_def => {
      const url = require(`../../images/cursors/${cursor_def[0]}.png`);
      return `url(${url}) ${cursor_def[1].join(' ')}, ${cursor_def[2]}`;
    };

    return (
      <div className={styles.toolbar}>
        <div className={styles.tools}>
          {tools.map((tool, index) => {
            const offsetX = (index % 2) * 24;
            const offsetY = ~~(index / 2) * 25;
            return <Tool offsetX={offsetX} offsetY={offsetY} key={uuid()} />;
          })}
        </div>
        <div className={styles.tool__options} />
      </div>
    );
  }
}

export default ToolBox;
