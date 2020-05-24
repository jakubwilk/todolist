import React from "react";
import styled from "styled-components";
import background from "../utils/banner-background.jpg";

const BannerWrapper = styled.section`
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 5rem;
    padding-bottom: 5rem;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(112, 111, 211, .95);
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

const Content = styled.div`
    position: relative;
    z-index: 10;
    text-align: center;
`;

const SectionTitle = styled.h2`
    font-size: 4rem;
    margin: 0;
    color: white;
    position: relative;
    z-index: 1;
`;

const SectionDescription = styled.p`
  margin-bottom: 0;
  color: rgba(255,255,255, .85);
  font-size: 1.5rem;
`;

const Banner = () => {
    return (
        <BannerWrapper>
            <Container>
                <Content>
                    <SectionTitle>Just try now</SectionTitle>
                    <SectionDescription>Don't waste your time for another {`ToDo`} tools and choose us!</SectionDescription>
                </Content>
            </Container>
        </BannerWrapper>
    )
};

export default Banner;