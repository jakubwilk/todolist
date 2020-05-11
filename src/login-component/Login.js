import React from "react";

class Login extends React.Component {
    componentDidMount = () => {
        document.title = "ToDo List - Login page";
    };

    render() {
        return <h1>Login form</h1>;
    }
}

export default Login;
