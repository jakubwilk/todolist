import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 768px) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  @media screen and (min-width: 960px) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
`;

const HomeTitle = styled.h1`
  font-family: 'Noto', sans-serif;
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 4rem;
  color: #2b2b2b;

  @media screen and (min-width: 768px) {
    font-size: 5rem;
  }
`;

const HomeCard = styled.article`
  display: inline-block;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 10px 10px 0 #f2f2f2;

  @media screen and (min-width: 768px) {
    padding: 2rem;
    margin-top: 5rem;
    margin-left: 4rem;
  }

  & > p {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.8rem;
    color: #707070;
  }
`;

const Welcomeblock = () => {
  return (
    <Content>
      <HomeTitle>ToDo List</HomeTitle>  
      <HomeCard>
        <p>Awesome tool for every person who is a busy and need day plan. Create each task, mark if finished and go on!</p>
      </HomeCard>
    </Content>
  )
}

export default Welcomeblock;