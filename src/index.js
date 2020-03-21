import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import * as serviceWorker from './serviceWorker';

const AppStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    min-height: 100%;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    font-size: 1rem;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <AppStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
