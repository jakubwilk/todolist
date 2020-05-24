import React, { Component } from "react";
import styled from "styled-components";

import FormInput from "./../utils/FormInput";
import ValidationMessage from "./../utils/ValidationMessage";

const PageForm = styled.form`
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  margin-bottom: .5rem;
  color: #777;
`;

const LoginButton = styled.input`
  background-color: #706fd3;
  color: #fff;
  border-radius: 5px;
  border: 0;
  padding: .6rem 2rem;
  cursor: pointer;
  font-weight: 700;
  transition: all .1s ease-in-out;

  &:hover,
  &:focus {
    outline: none;
    background-color: #2b2b2b;
  }

  &[disabled] {
    user-select: none;
    pointer-events: none;
    opacity: .6;
  }
`;

class LoginForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitMethod();
  }

  render() {
    return (
      <PageForm onSubmit={this.handleSubmit}>
        {this.props.resType !== undefined && !this.props.loading ? <ValidationMessage type={this.props.resType} message={this.props.resMessage} /> : null}
        <FormGroup>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <FormInput type="text" name="email" id="email" value={this.props.email} handleChange={this.props.updateState} placeholder="Enter your email address" />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput type="password" name="password" id="password" value={this.props.password} handleChange={this.props.updateState} placeholder="Enter your password" />
        </FormGroup>
        {this.props.email === "" || this.props.password === "" ?
          <LoginButton type="submit" value="Login" disabled />
          :
          <LoginButton type="submit" value="Login" />
        }
      </PageForm>
    );
  }
}

export default LoginForm;