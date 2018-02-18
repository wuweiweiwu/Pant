import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './Canvas.scss';
import Handle from './Handle';

import {
  resize,
  resizeTemp,
  press,
  unPress,
  setResizeDirection,
  cancelResize,
  VERTICAL,
  HORIZONTAL,
  DIAGONAL
} from '../../actions/canvas';

class Canvas extends Component {
  render() {
    const {
      width,
      height,
      tempWidth,
      tempHeight,
      resize,
      resizeTemp,
      resizeDirection,
      pressed,
      press,
      unPress,
      setResizeDirection,
      cancelResize
    } = this.props;

    return (
      <div
        className={styles.canvas__area}
        onMouseMove={e => {
          const offsetTop = 18;
          const offsetLeft = 56;

          const newWidth = e.clientX - offsetLeft;
          const newHeight = e.clientY - offsetTop;

          if (pressed) {
            switch (resizeDirection) {
              case HORIZONTAL:
                resizeTemp(newWidth, height);
                break;
              case VERTICAL:
                resizeTemp(width, newHeight);
                break;
              case DIAGONAL:
                resizeTemp(newWidth, newHeight);
                break;
              default:
                break;
            }
          }
        }}
        onMouseUp={() => {
          if (pressed) {
            resize();
            unPress();
          }
        }}
        onMouseLeave={() => {
          if (pressed) {
            cancelResize();
          }
        }}
      >
        <canvas width={width} height={height} />
        <Handle x={0} y={0} useless />
        <Handle x={0} y={height / 2 + 1.5} useless />
        <Handle x={0} y={height + 3} useless />
        <Handle x={width / 2 + 1.5} y={0} useless />
        <Handle x={width + 3} y={0} useless />

        {/* not useless handles */}
        <Handle
          x={width + 3}
          y={height / 2 + 1.5}
          cursor="ew-resize"
          onMouseDown={() => {
            press();
            setResizeDirection(HORIZONTAL);
          }}
        />
        <Handle
          x={width / 2 + 1.5}
          y={height + 3}
          cursor="ns-resize"
          onMouseDown={() => {
            press();
            setResizeDirection(VERTICAL);
          }}
        />
        <Handle
          x={width + 3}
          y={height + 3}
          cursor="nwse-resize"
          onMouseDown={() => {
            press();
            setResizeDirection(DIAGONAL);
          }}
        />
        {pressed && (
          <div
            className={styles.resize}
            style={{
              width: `${tempWidth}px`,
              height: `${tempHeight}px`
            }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    width: state.canvas.width,
    height: state.canvas.height,
    tempWidth: state.canvas.tempWidth,
    tempHeight: state.canvas.tempHeight,
    pressed: state.canvas.pressed,
    resizeDirection: state.canvas.resizeDirection
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resize,
      resizeTemp,
      press,
      unPress,
      setResizeDirection,
      cancelResize
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
