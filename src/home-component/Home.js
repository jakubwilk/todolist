import React from 'react';
import styled from 'styled-components';

import HomeSVG from '../utils/homeSVG';
import Welcomeblock from './Welcomeblock';

const HomeWrapper = styled.section`
  height: 100%;
  padding-top: 70px;

  @media screen and (min-width: 768px) {
    height: 100vh;
    padding-top: 70px;
    display: flex;
    align-items: center;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 65%;
      height: 90%;
      background-color: #706fd3;
      border-top-left-radius: 100%;
      z-index: 10;
    }
  }
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

const HomeContent = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const HomeBackground = styled.div`
  position: relative;
  transform: translateX(-25rem);
  top: 0;
  z-index: 15;
  width: 500px;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Container>
        <HomeContent>
          <HomeBackground>
            <HomeSVG />
          </HomeBackground>
          <Welcomeblock />
        </HomeContent>
      </Container>
    </HomeWrapper>
  );
}

export default Home;