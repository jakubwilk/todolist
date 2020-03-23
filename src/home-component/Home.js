import React from 'react';
import styled from 'styled-components';
import background from '../utils/home-background.jpg';

import Welcomeblock from './Welcomeblock';

const HomeWrapper = styled.section`
  background-image: url(${props => props.background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  padding-top: 70px;
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

const Home = () => {
  return (
    <HomeWrapper background={background}>
      <Container>
        <Welcomeblock />
      </Container>
    </HomeWrapper>
  );
}

export default Home;