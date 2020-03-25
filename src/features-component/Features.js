import React from 'react';
import styled from 'styled-components';

const FeaturesWrapper = styled.section`
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
    content: "Okay, but...";
    position: absolute;
    top: -3rem;
    left: -3rem;
    color: rgba(112,111,211, .1);
    z-index: -1;
    font-size: 6rem;
  }
`;

const Features = () => {
  return (
    <FeaturesWrapper>
      <Container>
        <SectionTitle>Features</SectionTitle>
      </Container>
    </FeaturesWrapper>
  )
}

export default Features;