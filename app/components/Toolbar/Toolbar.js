import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import Tool from './Tool';

import styles from './Toolbar.scss';

class ToolBox extends Component {
  render() {
    const getCursor = cursor_def => {
      const url = require(`./images/cursors/${cursor_def[0]}.png`);
      return `url(${url}) ${cursor_def[1].join(' ')}, ${cursor_def[2]}`;
    };

    const tools = [
      {
        name: 'Free-Form Select',
        description: 'Selects a free-form part of the picture to move, copy, or edit.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Select',
        description: 'Selects a rectangular part of the picture to move, copy, or edit.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Eraser/Color Eraser',
        description: 'Erases a portion of the picture, using the selected eraser shape.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Fill With Color',
        description: 'Fills an area with the selected drawing color.',
        cursor: ['fill-bucket', [8, 22], 'crosshair']
      },
      {
        name: 'Pick Color',
        description: 'Picks up a color from the picture for drawing.',
        cursor: ['eye-dropper', [9, 22], 'crosshair']
      },
      {
        name: 'Magnifier',
        description: 'Changes the magnification.',
        cursor: ['magnifier', [16, 16], 'zoom-in']
      },
      {
        name: 'Pencil',
        description: 'Draws a free-form line one pixel wide.',
        cursor: ['pencil', [13, 23], 'crosshair']
      },
      {
        name: 'Brush',
        description: 'Draws using a brush with the selected shape and size.',
        cursor: ['precise-dotted', [16, 16], 'crosshair']
      },
      {
        name: 'Airbrush',
        description: 'Draws using an airbrush of the selected size.',
        cursor: ['airbrush', [7, 22], 'crosshair']
      },
      {
        name: 'Text',
        description: 'Inserts text into the picture.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Line',
        description: 'Draws a straight line with the selected line width.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Curve',
        description: 'Draws a curved line with the selected line width.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Rectangle',
        description: 'Draws a rectangle with the selected fill style.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Polygon',
        description: 'Draws a polygon with the selected fill style.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Ellipse',
        description: 'Draws an ellipse with the selected fill style.',
        cursor: ['precise', [16, 16], 'crosshair']
      },
      {
        name: 'Rounded Rectangle',
        description: 'Draws a rounded rectangle with the selected fill style.',
        cursor: ['precise', [16, 16], 'crosshair']
      }
    ];

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
