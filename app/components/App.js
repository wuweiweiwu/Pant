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
            active
            // show
            title="Colors"
            isColor
            content={<Colorbar inWindow />}
            top={100}
            left={100}
            height={65}
            width={245}
            docked={(x, y) => {
              if (y < 15 || y + 65 + 50 + 30 > window.innerHeight) {
                return true;
              }
              return false;
            }}
          />

          <Window
            show
            title="Tools"
            content={<Toolbar />}
            top={200}
            left={200}
            height={290}
            width={60}
            docked={(x, y) => {
              if (x < 58 || x + 65 > window.innerWidth) {
                return true;
              }
              return false;
            }}
          />
        </div>
      </div>
    );
  }
}
