import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';

import './assets/application.css';
import init from './Init.jsx';

const socket = io();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  const vdom = await init(socket);
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(vdom);
};

app();
