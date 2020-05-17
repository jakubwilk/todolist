import React from "react";
import { Link } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
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
    position: relative;
    background-color: white;
    box-shadow: 10px 10px 0 #f2f2f2;
    padding: 1.5rem;
`;

const SpinnerLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(255,255,255, .65);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PageTitle = styled.h1`
    margin-top: 0;
    text-align: center;
    font-size: 2.5rem;
`;

const RegisterText = styled.p`
    margin-bottom: 0;
    text-align: center;
    color: #2b2b2b;
`;

const RegisterLink = styled(Link)`
    text-decoration: none;
    color: #706fd3;
    font-size: 1.2rem;
    transition: all .1s ease-in-out;
    
    &:hover,
    &:focus {
        outline: none;
        border: 0;
        color: #2b2b2b;
    }
`;

const FormFooter = styled.footer`
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

const HomeLink = styled(Link)`
    text-decoration: none;
    color: #706fd3;
    transition: all .1s ease-in-out;

    &:hover,
    &:focus {
        outline: none;
        border: 0;
        color: #2b2b2b;
    }
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
                        {this.state.loading && 
                            <SpinnerLayer>
                                <ClockLoader loading={this.props.loading} color={"#706fd3"} size={80} />
                            </SpinnerLayer>
                        }
                        <PageTitle>Sign in</PageTitle>
                        <LoginForm 
                            email={this.state.email} 
                            password={this.state.password} 
                            updateState={this.updateState} 
                            resType={this.state.data.type} 
                            resMessage={this.state.data.message}
                            submitMethod={this.fetchData}
                            loading={this.state.loading} />
                            <RegisterText>Don't have an account yet? <RegisterLink to="/register" title="Join to our small community">Join us</RegisterLink> for free!</RegisterText>
                    </FormContent>
                    <FormFooter>
                        <HomeLink to="/" title="Back to homepage">← Home</HomeLink>
                    </FormFooter>
                </Container>
            </LoginPage>
        );
    }
}

export default Login;
