// author: @dudash
// license: Apache 2.0
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateStore } from "./statestore";
const stateStore = new StateStore();

console.log("node env is set to " + process.env.NODE_ENV);
console.log("public URL is set to " + process.env.PUBLIC_URL);

ReactDOM.render(
  <React.StrictMode>
    <App stateStore={stateStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// Register service worker as we are making a PWA
// https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.register();
