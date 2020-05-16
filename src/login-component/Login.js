import React from "react";
import styled from "styled-components";
import background from "../utils/auth-background.jpg";

import LoginForm from "./LoginForm";

const LoginPage = styled.div`
    background-image: url(${props => props.background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    padding-top: 70px;
`;

const Container = styled.div`
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    
    @media screen and (min-width: 768px) {
        max-width: 650px;
        margin-left: auto;
        margin-right: auto;
    }
    
    @media screen and (min-width: 960px) {
        padding-left: 0;
        padding-right: 0;
    }
`;

const FormContent = styled.section`
    background-color: white;
    box-shadow: 10px 10px 0 #f2f2f2;
    padding: 1.5rem;
`;

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
        return (
            <LoginPage background={background}>
                <Container>
                    <FormContent>
                        <LoginForm 
                            email={this.state.email} 
                            password={this.state.password} 
                            updateState={this.updateState} 
                            resType={this.state.data.type} 
                            resMessage={this.state.data.message}
                            submitMethod={this.fetchData}
                            loading={this.state.loading} />
                    </FormContent>
                </Container>
            </LoginPage>
        );
    }
}

export default Login;
