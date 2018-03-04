// @flow
import React, { Component, type Node } from 'react';
import classNames from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  startMoving,
  stopMoving,
  moveWindow,
  hideWindow,
  dockColorWindow
} from '../../actions/window';
import { setMarginLeft } from '../../actions/color';

import styles from './Window.scss';

type Props = {
  // user props
  title: string,
  content: Node,
  top: number,
  left: number,
  height: number,
  width: number,
  active?: boolean, // is this window active? Can we click and drag
  // show?: boolean, // are we showing this window
  docked?: (number, number, number) => boolean, // passed to evaluate if this window is docked

  // redux props
  moving: boolean,
  startMoving: (number, number) => void,
  stopMoving: () => void,
  currentX: number,
  currentY: number,
  offsetX: number,
  offsetY: number,

  isColor?: boolean,
  colorWindow: boolean,
  colorDock: number,
  hideWindow?: string => void
};

type State = {
  titlePressed: boolean,
  closePressed: boolean,
  updatedTop: number,
  updatedLeft: number
};

class Window extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      titlePressed: false,
      closePressed: false,

      // the updated locations
      updatedTop: Number.NEGATIVE_INFINITY,
      updatedLeft: Number.NEGATIVE_INFINITY
    };
    (this: any).pressClose = this.pressClose.bind(this);
    (this: any).unpressClose = this.unpressClose.bind(this);
    (this: any).pressTitle = this.pressTitle.bind(this);
    (this: any).unpressTitle = this.unpressTitle.bind(this);
  }

  documentMouseMove(e: MouseEvent) {
    const { window: state } = window.store.getState();
    if (state.moving && this.state.titlePressed) {
      window.store.dispatch(moveWindow(e.clientX, e.clientY));
    }
  }

  documentMouseUp(e: MouseEvent) {
    const { window: state } = window.store.getState();
    if (state.moving && this.props.active) {
      window.store.dispatch(stopMoving());
      // set the margins
      const {
        currentX,
        offsetX,
        currentY,
        offsetY,
        docked,
        isColor,
        colorDock
      } = this.props;

      if (docked) {
        const dockPos = docked(
          currentX - offsetX,
          currentY - offsetY,
          colorDock
        );

        // if dockPos > 0 or < 0 then hide window
        if (isColor && dockPos) {
          window.store.dispatch(setMarginLeft(currentX - offsetX));
          window.store.dispatch(hideWindow('color'));
        }
        // always update where dock is
        if (isColor) {
          window.store.dispatch(dockColorWindow(dockPos));
        }
      }
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
    document.addEventListener('mousemove', this.documentMouseMove.bind(this));
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
    const { isColor, hideWindow } = this.props;

    if (isColor && hideWindow) {
      hideWindow('color');
    }

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
      title,
      content,
      top,
      left,
      height,
      width,
      active,
      // show,
      moving,
      startMoving,
      stopMoving,
      currentX,
      currentY,
      offsetX,
      offsetY,
      docked,

      isColor,
      colorWindow,
      colorDock,
      hideWindow
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

    // actualTop = show ? actualTop : -500;
    actualTop = isColor && colorWindow ? actualTop : -1000;

    return (
      <div
        className={classNames({
          [styles.window]: true
          // [styles['window--hidden']]: !show
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
            if (active && !titlePressed) {
              this.pressTitle();
            }
          }}
          onMouseUp={() => {
            if (active && titlePressed) {
              if (
                docked &&
                docked(currentX - offsetX, currentY - offsetY, colorDock)
              ) {
                setMarginLeft(currentX - offsetX);
                if (isColor && hideWindow) {
                  hideWindow('color');
                }
              }
              this.unpressTitle();
              if (moving) {
                stopMoving();
              }
            }
          }}
          onMouseMove={e => {
            if (titlePressed && !moving && active) {
              startMoving(e.clientX - actualLeft, e.clientY - actualTop);
            }
          }}
        >
          <span className={styles.window__titlebar__title}>{title}</span>
          <button
            className={classNames(styles.window__titlebar__close, {
              [styles['window__titlebar__close--pressed']]: closePressed
            })}
            onMouseDown={this.pressClose}
            onMouseUp={this.unpressClose}
            onMouseLeave={this.unpressClose}
          />
        </div>
        <div className={styles.window__content}>{content}</div>
        {moving &&
          // show &&
          active && (
            <div
              className={classNames(styles.move, {
                [styles.docked]: docked
                  ? docked(currentX - offsetX, currentY - offsetY, colorDock)
                  : false
              })}
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
    offsetY: state.window.offsetY,

    // if color window is active
    colorWindow: state.window.colorWindow,
    colorDock: state.window.colorDock
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startMoving,
      stopMoving,
      setMarginLeft,
      hideWindow
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Window);
