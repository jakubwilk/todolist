import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import HomePage from "./homepage-component/HomePage";
import Register from "./register-component/Register";
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

    .editprofile {
        text-align: center;

        & > input, textarea {
            max-width: 100%;
        }

        &-file {
            @media screen and (min-width: 768px) {
                grid-column: 3 / span 6;
                grid-row: 1;
                text-align: left;
            }
        }

        &-email {
            @media screen and (min-width: 768px) {
                grid-column: 3 / span 6;
                grid-row: 2;
                text-align: left;
            }
        }

        &-description {
            @media screen and (min-width: 768px) {
                grid-column: 1 / span 6;
                grid-row: 3;
                text-align: left;
            }
        }

        &-first-name {
            @media screen and (min-width: 768px) {
                grid-column: 1 / span 3;
                grid-row: 4;
                text-align: left;
                margin-right: 12px;
            }
        }

        &-last-name {
            @media screen and (min-width: 768px) {
                grid-column: 4 / span 6;
                grid-row: 4;
                text-align: left;
                margin-left: 12px;
            }
        }
    }

    .editlist {
        & > input, textarea {
            max-width: 100%;
        }
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
                <Route path="/register">
                    <Register />
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
