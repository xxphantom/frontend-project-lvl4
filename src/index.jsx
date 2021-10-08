// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { render } from 'react-dom';
import '../assets/application.scss';
// import { Provider } from 'react-redux';
// import store from './store';
import App from './components/App.jsx';
import AuthProvider from './components/Authorisation.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('chat'),
// );

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('chat'),
);
