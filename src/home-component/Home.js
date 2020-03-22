import React from 'react';
import styled from 'styled-components';

import HomeSVG from '../utils/homeSVG';

const HomeWrapper = styled.section`
  height: 100vh;
  padding-top: 70px;
`;

const Home = () => {
  return (
    <HomeWrapper>
      Home
      <HomeSVG />
    </HomeWrapper>
  );
}

export default Home;