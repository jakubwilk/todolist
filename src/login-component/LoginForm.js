import React, { Component } from "react";
import styled from "styled-components";

import FormInput from "./../utils/FormInput";

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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email</label>
          <FormInput type="text" name="email" value={this.props.email} handleChange={this.props.updateState} placeholder="Enter your email address" />
        </div>
        <div>
          <label>Password</label>
          <FormInput type="password" name="password" value={this.props.password} handleChange={this.props.updateState} placeholder="Enter your password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;