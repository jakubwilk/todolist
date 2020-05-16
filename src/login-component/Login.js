import React from "react";
import LoginForm from "./LoginForm";

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        loading: false,
        data: []
    };

    componentDidMount = () => {
        document.title = "ToDo List - Login page";
    };

    updateState = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchData = () => {
        const data = new FormData();
        data.append('email', this.state.email);
        data.append('password', this.state.password);

        this.setState({ loading: true });
        fetch('http://localhost:44912/api/auth/login', 
            { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(data) })
            .then(res => res.json())
            .then(res => {
                this.setState({ data: res, loading: false });
            })
            .catch(err => {
                this.setState({ data: err, loading: false });
            });
    }

    render() {
        return <LoginForm 
                email={this.state.email} 
                password={this.state.password} 
                updateState={this.updateState} 
                resType={this.state.data.type} 
                resMessage={this.state.data.message}
                submitMethod={this.fetchData}
                loading={this.state.loading} />;
    }
}

export default Login;
