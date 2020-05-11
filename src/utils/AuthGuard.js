import React from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "../dashboard-component/Dashboard";
import Login from "../login-component/Login";

class AuthGuard extends React.Component {
    state = {
        userId: null,
        loading: true
    }

    componentDidMount = () => {
        fetch("http://localhost:44912/api/auth/token", { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.setState({ userId: res.message, loading: false });
                } else {
                    this.setState({ userId: null, loading: false });
                }
            })
            .catch(err => {
                this.setState({ userId: null, loading: false });
            })
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
            return 'Wait...';
        }
    }
}

export default AuthGuard;