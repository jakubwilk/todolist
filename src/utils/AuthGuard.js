import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
import styled from "styled-components";
import Dashboard from "../dashboard-component/Dashboard";
import Login from "../login-component/Login";

const SpinnerLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`;


class AuthGuard extends React.Component {
    state = {
        userId: null,
        loading: true
    }

    componentDidMount = () => {
        axios.get("http://localhost:44912/api/auth/token", { withCredentials: true })
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ userId: res.data.message, loading: false });
                } else {
                    this.setState({ userId: null, loading: false });
                }
            })
            .catch(err => {
                this.setState({ userId: null, loading: false });
            });
    }

    render() {
        const { userId, loading } = this.state;

        if (!loading) {
            return userId == null ? (
                <>
                    <Redirect from={`/dashboard`} to={`/login`} />
                    <Login />
                </>
            ) : (
                <>
                    <Redirect from={`/login`} to={`/dashboard`} />
                    <Dashboard />
                </>
            );
        } else {
            return (
                <SpinnerLayer>
                    <ClockLoader loading={this.props.loading} color={"#706fd3"} size={120} />
                </SpinnerLayer>
            );
        }
    }
}

export default AuthGuard;