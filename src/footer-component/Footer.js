import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.section`
  background-color: #2b2b2b;
  padding-top: 3rem;
  padding-bottom: 3rem;
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

const FooterText = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  color: #717171;

  & > a {
    color: #706fd3;
    text-decoration: none;
    transition: all .1s ease-in-out;

    &:hover,
    &:focus {
      color: #717171;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterText>Created with <span role='img' aria-label='Heart'>❤️</span> in 2020 by <a href='https://www.jakubwilk.pl/' title='Jakub Wilk - Front End Developer' target='__blank' rel='noopener'>Jakub Wilk</a></FooterText>
      </Container>
    </FooterWrapper>
  )
};

export default Footer;