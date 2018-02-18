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
  setScrollOffsets,
  VERTICAL,
  HORIZONTAL,
  DIAGONAL
} from '../../actions/canvas';

class Canvas extends Component {
  componentDidMount() {
    document.addEventListener('mousemove', e => {
      const offsetTop = 18;
      const offsetLeft = 56;

      const { canvas: state } = window.store.getState();

      let clientX = e.clientX,
        clientY = e.clientY;

      if (clientX < offsetLeft) {
        clientX = offsetLeft;
      }

      if (clientY < offsetTop) {
        clientY = offsetTop;
      }

      // in the case where there is overflowed
      const newWidth = clientX - offsetLeft + state.scrollLeft;
      const newHeight = clientY - offsetTop + state.scrollTop;

      if (state.pressed) {
        switch (state.resizeDirection) {
          case HORIZONTAL:
            window.store.dispatch(resizeTemp(newWidth, state.height));
            break;
          case VERTICAL:
            window.store.dispatch(resizeTemp(state.width, newHeight));
            break;
          case DIAGONAL:
            window.store.dispatch(resizeTemp(newWidth, newHeight));
            break;
          default:
            break;
        }
      }
    });

    document.addEventListener('mouseup', () => {
      const { canvas: state } = window.store.getState();
      if (state.pressed) {
        window.store.dispatch(resize());
        window.store.dispatch(unPress());
      }
    });
  }

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
      setScrollOffsets
    } = this.props;

    return (
      <div
        className={styles.canvas__area}
        onMouseUp={() => {
          if (pressed) {
            resize();
            unPress();
          }
        }}
        onScroll={e => {
          setScrollOffsets(e.target.scrollTop, e.target.scrollLeft);
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
      setScrollOffsets
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
