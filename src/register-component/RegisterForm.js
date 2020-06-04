import React, { Component } from "react";
import styled from "styled-components";

import FormInput from "./../utils/FormInput";
import ValidationMessage from "./../utils/ValidationMessage";

const PageForm = styled.form`
  	text-align: center;
`;

const RegisterButton = styled.input`
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

class RegisterForm extends Component {
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
				<FormInput labelFor="email" labelName="Email Address" type="text" name="email" id="email" groupClass="" value={this.props.email} handleChange={this.props.updateState} placeholder="Enter your email address" />
				<FormInput labelFor="password" labelName="Password" type="password" name="password" id="password" groupClass="" value={this.props.password} handleChange={this.props.updateState} placeholder="Enter your password" />
				{this.props.email === "" || this.props.password === "" ?
				<RegisterButton type="submit" value="Register" disabled />
				:
				<RegisterButton type="submit" value="Register" />
				}
			</PageForm>
		);
	}
}

export default RegisterForm;
