import React from "react";
import styled from "styled-components";

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

const FormInput = ({ type, name, value, handleChange, placeholder }) => {
  return (
    <Input type={type} name={name} value={value} onChange={handleChange} placeholder={placeholder} autoComplete="off" />
  );
}

export default FormInput;