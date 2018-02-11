// @flow
import * as React from 'react';

import MenuBar from '../components/MenuBar';

type Props = {
  // children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        {/* {this.props.children} */}
        <MenuBar />
      </div>
    );
  }
}
