import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: block;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  margin-bottom: 1.5rem;

  &.error {
    background-color: #e55039;
  }

  &.success {
    background-color: #b8e994;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #fff;
  margin: 0%;
`;

const ValidationMessage = ({ type, message }) => {
  return (
    <Box className={`${type}`}>
      <Message>{message}</Message>
    </Box>
  );
}

export default ValidationMessage;