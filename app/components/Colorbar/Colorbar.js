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
  style?: { [string]: string }
};

class Colorbar extends Component<Props> {
  canvas: ?HTMLCanvasElement;
  input: ?HTMLInputElement;

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
      style
    } = this.props;

    let debounce: TimeoutID;

    return (
      <div className={styles.colorbar} style={style}>
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
    palette: state.color.palette
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
      changePaletteIndex
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Colorbar);
