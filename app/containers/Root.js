// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from '../components/App';

type Props = {
  store: {}
};

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}
