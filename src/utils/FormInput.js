import React from "react";
import styled from "styled-components";

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

const Input = styled.input`
  	width: 100%;
  	max-width: 70%;
  	margin-left: auto;
  	margin-right: auto;
  	padding: .6rem 1rem;
  	border-radius: 5px;
  	border: 1px solid #e2e2e2;
  	transition: all .1s ease-in-out;

  	&:hover {
    	border-color: #706fd3;
  	}

  	&:focus {
    	outline: none;
    	border-color: #706fd3;
    	box-shadow: 0 0 0 4px rgba(112, 111, 221, .3);
  	}
`;

const FormInput = ({ labelFor, labelName, type, name, groupClass, value, handleChange, placeholder }) => {
  	return (
    	<FormGroup className={groupClass}>
			<FormLabel htmlFor={labelFor}>{labelName}</FormLabel>
			<Input type={type} name={name} id={name} value={value} onChange={handleChange} placeholder={placeholder} autoComplete="off" />
		</FormGroup>
  	);
}

export default FormInput;
