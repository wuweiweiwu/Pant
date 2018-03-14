// @flow
import React, { Component } from 'react';
import uuid from 'uuid/v1';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  changePrimary,
  changeSecondary,
  changeTertiary,
  changePalette,
  changePaletteIndex,
  swapPrimarySecondary
} from '../../actions/color';

import {
  startMoving,
  stopMoving,
  moveWindow,
  showWindow
} from '../../actions/window';

import ColorCell from './ColorCell';
import styles from './Colorbar.scss';

type Props = {
  primary: string,
  secondary: string,
  tertiary: string,
  changePrimary: string => void,
  changeSecondary: string => void,
  changeTertiary: string => void,
  swapPrimarySecondary: () => void,
  changePalette: string => void,
  changePaletteIndex: number => void,
  palette: Array<string>,
  style?: { [string]: string },
  inWindow?: boolean,
  marginLeft: number,

  moving: boolean,
  startMoving: (number, number) => void,
  stopMoving: () => void
};

type State = {
  clicked: boolean
};

class Colorbar extends Component<Props, State> {
  canvas: ?HTMLCanvasElement;
  input: ?HTMLInputElement;
  ownInstance: ?HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', () => {
      const { window: state } = window.store.getState();
      if (state.moving && this.state.clicked) {
        window.store.dispatch(showWindow('color'));
        this.setState({
          clicked: false
        });
      }
    });

    document.addEventListener('mousemove', (e: MouseEvent) => {
      const { window: state } = window.store.getState();
      if (state.moving && this.state.clicked) {
        window.store.dispatch(moveWindow(e.clientX, e.clientY));
      }
    });
  }

  componentDidUpdate() {
    const { tertiary } = this.props;
    if (this.canvas && tertiary) {
      const ctx = this.canvas.getContext('2d');
      ctx.fillStyle = tertiary;
      ctx.fillRect(0, 0, 29, 29);
    }
  }

  render() {
    const {
      primary,
      secondary,
      changePrimary,
      changeSecondary,
      changeTertiary,
      swapPrimarySecondary,
      changePalette,
      changePaletteIndex,
      palette,
      style,
      marginLeft,
      inWindow,

      moving,
      startMoving,
      stopMoving
    } = this.props;

    const { clicked } = this.state;

    let debounce: TimeoutID;

    return (
      <div
        className={styles.colorbar}
        style={inWindow ? style : { marginLeft: `${marginLeft + 2}px` }}
        onMouseDown={() => {
          if (!clicked && !inWindow) {
            this.setState({
              clicked: true
            });
          }
        }}
        onMouseUp={() => {
          if (clicked && !inWindow) {
            this.setState({
              clicked: false
            });
            if (moving) {
              stopMoving();
            }
          }
        }}
        onMouseMove={e => {
          if (!moving && clicked && !inWindow) {
            // this sets the offset
            if (this.ownInstance) {
              const rect = this.ownInstance.getBoundingClientRect();
              startMoving(e.clientX - rect.left, e.clientY - rect.top);
            }
          }
        }}
        ref={el => {
          this.ownInstance = el;
        }}
      >
        <div className={styles.colorbar__switcher}>
          <canvas
            ref={canvas => (this.canvas = canvas)}
            height="29px"
            width="29px"
          />
          <ColorCell
            picker
            color={secondary}
            style={{
              position: 'absolute',
              right: '3px',
              bottom: '3px'
            }}
            onClick={e => {
              e.preventDefault();
              swapPrimarySecondary();
            }}
            onContextMenu={e => {
              e.preventDefault();
              swapPrimarySecondary();
            }}
          />
          <ColorCell
            picker
            color={primary}
            style={{
              position: 'absolute',
              left: '2px',
              top: '4px'
            }}
            onClick={e => {
              e.preventDefault();
              swapPrimarySecondary();
            }}
            onContextMenu={e => {
              e.preventDefault();
              swapPrimarySecondary();
            }}
          />
        </div>
        <div className={styles.colorbar__palette}>
          {palette.map((color, index) => (
            <ColorCell
              key={uuid()}
              color={color}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();

                changePrimary(color);
              }}
              onContextMenu={e => {
                e.preventDefault();
                if (e.ctrlKey) {
                  changeTertiary(color);
                } else {
                  changeSecondary(color);
                }
              }}
              onDoubleClick={e => {
                e.preventDefault();
                changePaletteIndex(index);
                if (this.input) {
                  this.input.value = color;
                  this.input.click();
                }
              }}
            />
          ))}
        </div>
        <input
          type="color"
          ref={input => (this.input = input)}
          onChange={e => {
            e.persist();
            clearTimeout(debounce);
            debounce = setTimeout(() => {
              changePalette(e.target.value);
              changePrimary(e.target.value);
            }, 200);
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    primary: state.color.primary,
    secondary: state.color.secondary,
    tertiary: state.color.tertiary,
    palette: state.color.palette,
    marginLeft: state.color.marginLeft,

    moving: state.window.moving
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changePrimary,
      changeSecondary,
      changeTertiary,
      swapPrimarySecondary,
      changePalette,
      changePaletteIndex,
      startMoving,
      stopMoving
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Colorbar);
