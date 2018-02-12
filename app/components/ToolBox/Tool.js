import React, { Component } from 'react';
import classNames from 'classnames';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './Tool.css';

class Tool extends Component {
  render() {
    return <div className={styles.toolbox} />;
  }
}

export default Tool;
