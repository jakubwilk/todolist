import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  z-index: 15;
`;

const HomeCard = styled.article`
  display: inline-block;
  background-color: white;
  padding: 2rem;
`;

const Welcomeblock = () => {
  return (
    <Content>
      <HomeCard>
        Welcomeblock.Component
      </HomeCard>
    </Content>
  )
}

export default Welcomeblock;