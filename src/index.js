// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { render } from 'react-dom';
import 'assets/application.scss';
import init from './Init.jsx';
import io from './api/socket.js';

const socket = io();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  const vdom = await init(socket);
  render(vdom, document.getElementById('chat'));
};

app();
