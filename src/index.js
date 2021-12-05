// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { render } from 'react-dom';
import '../assets/application.scss';
import init from './Init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const vdom = init();

render(vdom, document.getElementById('chat'));
