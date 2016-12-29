import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reducers from '../redux/reducers/index';
import Inventory from './Inventory';
import { Provider } from 'react-redux';
import { compose, combineReducers, createStore } from 'redux';

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

let store = finalCreateStore(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Inventory />
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
