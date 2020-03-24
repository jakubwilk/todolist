import React from 'react';
import styled from 'styled-components';

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

const About = () => {
  return (
    <AboutWrapper name='about'>
      <Container>
        <SectionTitle>About us</SectionTitle>
      </Container>
    </AboutWrapper>
  )
}

export default About;