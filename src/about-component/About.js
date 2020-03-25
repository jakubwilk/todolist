import React from 'react';
import styled from 'styled-components';

import QuestionAndAnswer from './QuestionAndAnswer';

const AboutWrapper = styled.section`
  background-color: #f6f6f6;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const Container = styled.div`
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;

  @media screen and (min-width: 768px) {
    max-width: 860px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 960px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  margin: 0;
  color: #666;
  position: relative;
  z-index: 1;

  &::after {
    content: "Let's talk...";
    position: absolute;
    top: -3rem;
    left: -3rem;
    color: #e9e9e9;
    z-index: -1;
    font-size: 6rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-gap: 2.5rem;

  @media screen and (min-width: 960px) {
    grid-template-columns: 50% 50%;
  }
`;

const QAList = [
  {
    number: 1,
    question: 'Who we are?',
    answer: 'A small team with huge perspective to change our world. Make more friendly and without chaos. We are not a regular team with hobbies or families, we are superhero of programming.'
  },
  {
    number: 2,
    question: 'What is special on this?',
    answer: 'Everything! More user-frienldy interface, more options, more everything. Is not just a ToDo app, it is the future.'
  },
  {
    number: 3,
    question: 'What technologies were used?',
    answer: 'We focued on only modern solutions. On our front-end layer we decided to use a ReactJS with full support Styled-Components. And in our back-end where we storage logic of our app, we used an Express framework and Firebase.'
  }
]

const About = () => {
  return (
    <AboutWrapper name='about'>
      <Container>
        <SectionTitle>About us</SectionTitle>
        <Content>
          {QAList.map(item => 
            <QuestionAndAnswer 
              key={item.number} 
              number={item.number} 
              question={item.question} 
              answer={item.answer} 
            />
          )}
        </Content>
      </Container>
    </AboutWrapper>
  )
}

export default About;