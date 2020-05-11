import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import HomePage from "./homepage-component/HomePage";
import AuthGuard from "./utils/AuthGuard";

const AppStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
        min-height: 100%;
    }

    ::selection {
        background-color: #706fd3;
        color: white;
    }

    ::-moz-selection {
        background-color: #706fd3;
        color: white;
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
        font-family: 'Baloo 2', cursive;
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
                <Route path="/login">
                    <AuthGuard />
                </Route>
                <Route path="/dashboard">
                    <AuthGuard />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
