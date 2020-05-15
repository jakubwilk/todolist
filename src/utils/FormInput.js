import React from "react";

const FormInput = ({ type, name, value, handleChange, placeholder }) => {
  return (
    <input type={type} name={name} value={value} onChange={handleChange} placeholder={placeholder} autoComplete="off" />
  );
}

export default FormInput;