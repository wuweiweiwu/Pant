// @flow
import * as React from 'react';

import MenuBar from './MenuBar';
import Toolbar from './Toolbar';

import styles from './App.css';

type Props = {
  // children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.reactpaint}>
        <div className={styles.vertical}>
          <MenuBar />
          <div className={styles.horizontal}>
            <Toolbar />
          </div>
        </div>
      </div>
    );
  }
}
