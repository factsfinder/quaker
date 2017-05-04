import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './containers/app.js';
require("!style-loader!css-loader!sass-loader!../sass/main.scss");


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
