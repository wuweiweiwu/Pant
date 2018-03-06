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
          <Colorbar top style={{ marginLeft: '2px' }} />

          <div className={styles.horizontal}>
            <Toolbar />
            <Canvas />
          </div>
          <Colorbar bottom style={{ marginLeft: '2px' }} />
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
            docked={(x, y, colorPos) => {
              let lowerBound = 20;
              let upperBound = window.innerHeight - 95;

              if (colorPos > 0) {
                upperBound -= 40;
              } else if (colorPos < 0) {
                lowerBound += 40;
              }

              if (y < lowerBound) {
                return -1;
              } else if (y > upperBound) {
                return 1;
              }
              return 0;
            }}
          />

          {/* <Window
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
          /> */}
        </div>
      </div>
    );
  }
}
