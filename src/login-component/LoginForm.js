import React, { Component } from "react";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";

import FormInput from "./../utils/FormInput";
import ValidationMessage from "./../utils/ValidationMessage";

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
    if (this.props.loading) {
      return <ClockLoader loading={this.props.loading} color={"#706fd3"} size={50} />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.resType === "error" ? <ValidationMessage type={this.props.resType} message={this.props.resMessage} /> : null}
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