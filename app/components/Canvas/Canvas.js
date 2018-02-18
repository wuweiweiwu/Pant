import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Canvas.scss';
import Handle from './Handle';

import { resize } from '../../actions/canvas';

class Canvas extends Component {
  render() {
    const { x, y } = this.props;

    return (
      <div className={styles.canvas__area}>
        <canvas width={x} height={y} />
        <Handle x={0} y={0} useless />
        <Handle x={0} y={y / 2 + 1.5} useless />
        <Handle x={0} y={y + 3} useless />
        <Handle x={x / 2 + 1.5} y={0} useless />
        <Handle x={x + 3} y={0} useless />

        {/* not useless handles */}
        <Handle x={x + 3} y={y / 2 + 1.5} cursor="ew-resize" />
        <Handle x={x / 2 + 1.5} y={y + 3} cursor="ns-resize" />
        <Handle x={x + 3} y={y + 3} cursor="nwse-resize" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    x: state.canvas.x,
    y: state.canvas.y
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resize
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
