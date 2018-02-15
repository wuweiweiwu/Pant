import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import ColorCell from './ColorCell';
import styles from './Colorbar.scss';

class Colorbar extends Component {
  componentDidMount() {
    if (!this.primary) return;

    const ctx1 = this.primary.getContext('2d');
    ctx1.fillStyle = 'black';
    ctx1.fillRect(0, 0, 13, 13);

    if (!this.secondary) return;
    const ctx2 = this.secondary.getContext('2d');
    ctx2.fillStyle = 'white';
    ctx2.fillRect(0, 0, 13, 13);
  }

  render() {
    const palette = [
      '#000000',
      '#787878',
      '#790300',
      '#757A01',
      '#007902',
      '#007778',
      '#0A0078',
      '#7B0077',
      '#767A38',
      '#003637',
      '#286FFE',
      '#083178',
      '#4C00FE',
      '#783B00',
      '#FFFFFF',
      '#BBBBBB',
      '#FF0E00',
      '#FAFF08',
      '#00FF0B',
      '#00FEFF',
      '#3400FE',
      '#FF00FE',
      '#FBFF7A',
      '#00FF7B',
      '#76FEFF',
      '#8270FE'
      // '#FF0677',
      // '#FF7D36'
    ];

    return (
      <div className={styles.colorbar}>
        <div className={styles.colorbar__switcher}>
          <canvas height="29px" width="29px" />
          <ColorCell
            picker
            color="white"
            style={{
              position: 'absolute',
              right: '3px',
              bottom: '3px'
            }}
          />
          <ColorCell
            picker
            color="black"
            style={{
              position: 'absolute',
              left: '2px',
              top: '4px'
            }}
          />
        </div>
        <div className={styles.colorbar__palette}>
          {palette.map(color => <ColorCell color={color} key={uuid()} />)}
        </div>
        <input ref={input => (this.colorInput = input)} type="color" />
      </div>
    );
  }
}

export default Colorbar;
