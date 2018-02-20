import React, { Component } from 'react';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startMoving, stopMoving, moveWindow } from '../../actions/window';

import styles from './Window.scss';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titlePressed: false,
      closePressed: false,

      // the updated locations
      updatedTop: Number.NEGATIVE_INFINITY,
      updatedLeft: Number.NEGATIVE_INFINITY
    };
    this.pressClose = this.pressClose.bind(this);
    this.unpressClose = this.unpressClose.bind(this);
    this.pressTitle = this.pressTitle.bind(this);
    this.unpressTitle = this.unpressTitle.bind(this);
  }

  documentMouseMove(e) {
    const { window: state } = window.store.getState();
    if (state.moving) {
      window.store.dispatch(moveWindow(e.clientX, e.clientY));
    }
  }

  documentMouseUp(e) {
    const { window: state } = window.store.getState();
    if (state.moving && this.props.open) {
      window.store.dispatch(stopMoving());
      // set updated location of the current window
      this.setState((undefined, props) => {
        const { offsetX, offsetY, currentX, currentY } = props;
        return {
          updatedLeft: currentX - offsetX,
          updatedTop: currentY - offsetY
        };
      });
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.documentMouseMove);
    document.addEventListener('mouseup', this.documentMouseUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.documentMouseMove);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.moving) {
      this.setState({
        titlePressed: false
      });
    }
  }

  pressClose() {
    this.setState({
      closePressed: true
    });
  }

  unpressClose() {
    this.setState({
      closePressed: false
    });
  }

  pressTitle() {
    this.setState({
      titlePressed: true
    });
  }

  unpressTitle() {
    this.setState({
      titlePressed: false
    });
  }

  render() {
    const {
      // user props
      title,
      content,
      top,
      left,
      height,
      width,
      open,

      // redux props
      moving,
      startMoving,
      stopMoving,
      currentX,
      currentY,
      offsetX,
      offsetY
    } = this.props;

    const { titlePressed, closePressed, updatedTop, updatedLeft } = this.state;

    // actual position of this window
    let actualLeft, actualTop;
    if (updatedTop === Number.NEGATIVE_INFINITY) {
      actualLeft = left;
      actualTop = top;
    } else {
      actualLeft = updatedLeft;
      actualTop = updatedTop;
    }

    return (
      <div
        className={classNames({
          [styles.window]: true,
          [styles['window--hidden']]: !open
        })}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          top: `${actualTop}px`,
          left: `${actualLeft}px`
        }}
      >
        <div
          className={styles.window__titlebar}
          onMouseDown={() => {
            if (open && !titlePressed) {
              this.pressTitle();
            }
          }}
          onMouseUp={() => {
            if (open && titlePressed) {
              this.unpressTitle();
              if (moving) {
                stopMoving();
              }
            }
          }}
          onMouseMove={e => {
            if (titlePressed && !moving && open) {
              startMoving(e.clientX - actualLeft, e.clientY - actualTop);
            }
          }}
        >
          <span className={styles.window__titlebar__title}>{title}</span>
          <button
            className={classNames({
              [styles.window__titlebar__close]: true,
              [styles['window__titlebar__close--pressed']]: closePressed
            })}
            onMouseDown={this.pressClose}
            onMouseUp={this.unpressClose}
            onMouseLeave={this.unpressClose}
          />
        </div>
        <div className={styles.window__content}>{content}</div>
        {moving &&
          open && (
            <div
              className={styles.move}
              style={{
                height: `${height}px`,
                width: `${width}px`,
                top: `${currentY - actualTop - offsetY}px`,
                left: `${currentX - actualLeft - offsetX}px`
              }}
            />
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    moving: state.window.moving,

    // where the cursor currently is
    currentX: state.window.currentX,
    currentY: state.window.currentY,

    // initial mousemove offset
    offsetX: state.window.offsetX,
    offsetY: state.window.offsetY
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startMoving,
      stopMoving
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Window);
