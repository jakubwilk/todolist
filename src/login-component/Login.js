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

        fetch('http://localhost:44912/api/auth/login', 
            { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(data) })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return <LoginForm 
                email={this.state.email} 
                password={this.state.password} 
                updateState={this.updateState} 
                resType={this.state.data} 
                resMessage={this.state.data}
                submitMethod={this.fetchData} />;
    }
}

export default Login;
