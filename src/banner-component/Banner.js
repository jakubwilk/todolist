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
`;

const Banner = () => {
    console.log(background);
    return (
        <BannerWrapper>
            <Container>
                <Content>
                    Banner
                </Content>
            </Container>
        </BannerWrapper>
    )
};

export default Banner;