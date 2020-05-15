import React from 'react';
import reducer from './redux';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from '../App';
const store = createStore(reducer);

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
