import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import HomePage from './home-component/HomePage';

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
    font-family: 'Baloo 2', cursive;
    color: #2b2b2b;
  }

  input,
  button,
  textarea {
    font-size: 1rem;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <AppStyle />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
