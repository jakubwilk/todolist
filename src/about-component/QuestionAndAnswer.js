import React from "react";
import styled from "styled-components";

const Content = styled.article`
  position: relative;
`;

const Question = styled.h3`
  font-family: 'Noto', sans-serif;
  position: relative;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
  z-index: 10;
  color: #2b2b2b;
`;

const QuestionNumber = styled.span`
  position: absolute;
  z-index: -1;
  bottom: -5rem;
  left: -2rem;
  user-select: none;
  color: #e9e9e9;
  font-size: 5rem;
`;

const Answer = styled.p`
  position: relative;
  z-index: 10;
  margin-top: 0;
  margin-bottom: 0;
`;

const QuestionAndAnswer = ({ number, question, answer }) => {
  return (
    <Content>
      <Question>
        <QuestionNumber>{number}</QuestionNumber>
        {question}
      </Question>
      <Answer>{answer}</Answer>
    </Content>
  )
}

export default QuestionAndAnswer;