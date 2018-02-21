// @flow
import * as React from 'react';

import Menubar from './Menubar';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import Colorbar from './Colorbar';
import Statusbar from './Statusbar';

import Window from './Window';

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
          <Colorbar style={{ marginLeft: '2px' }} />
          <Statusbar />

          <Window
            show
            title="Colors"
            content={<Colorbar />}
            top={100}
            left={100}
            height={65}
            width={245}
          />

          <Window
            show
            active
            title="Tools"
            content={<Toolbar />}
            top={200}
            left={200}
            height={290}
            width={60}
          />
        </div>
      </div>
    );
  }
}
