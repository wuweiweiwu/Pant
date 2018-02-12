// @flow
import * as React from 'react';

import MenuBar from './MenuBar';

type Props = {
  // children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <MenuBar />
        <div />
      </div>
    );
  }
}
