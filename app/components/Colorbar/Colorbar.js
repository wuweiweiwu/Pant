import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  changePrimary,
  changeSecondary,
  changeTertiary,
  changePalette,
  swapPrimarySecondary
} from '../../actions/color';

import ColorCell from './ColorCell';
import styles from './Colorbar.scss';

class Colorbar extends Component {
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
      palette,
      changePrimary,
      changeSecondary,
      changeTertiary,
      swapPrimarySecondary,
      changePalette
    } = this.props;

    return (
      <div className={styles.colorbar}>
        <div className={styles.colorbar__switcher}>
          <canvas ref={canvas => (this.canvas = canvas)} height="29px" width="29px" />
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
                if (window.event.ctrlKey) {
                  changeTertiary(color);
                } else {
                  changeSecondary(color);
                }
              }}
              onDoubleClick={e => {
                e.preventDefault();
                const colorChanger = document.createElement('input');
                colorChanger.setAttribute('type', 'color');
                colorChanger.setAttribute('value', color);
                colorChanger.click();
                let timeout;
                let currColor;
                colorChanger.addEventListener('change', e => {
                  clearInterval(timeout);
                  currColor = e.target.value;
                  // timeout = setTimeout(() => console.log('change:', currColor), 100);
                  timeout = setTimeout(() => {
                    changePalette(index, currColor);
                    changePrimary(currColor);
                  }, 100);
                  // console.log('change:', e.target.value);
                  // changePalette(index, e.target.value);
                  // changePrimary(e.target.value);
                });
              }}
            />
          ))}
        </div>
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
      changePalette,
      swapPrimarySecondary
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Colorbar);
