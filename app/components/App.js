// @flow
import * as React from 'react';

import Menubar from './Menubar';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import Colorbar from './Colorbar';

import styles from './App.scss';

type Props = {
  // children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.reactpaint}>
        <div className={styles.vertical}>
          <Menubar />
          <div className={styles.horizontal}>
            <Toolbar />
            <Canvas />
          </div>
          <Colorbar />
        </div>
      </div>
    );
  }
}
