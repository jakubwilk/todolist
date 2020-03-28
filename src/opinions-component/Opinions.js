import React from "react";
import styled from "styled-components";

import OpinionItem from "./OpinionItem";

import ChrisImage from "../utils/chris-evans.jpg";
import NolanImage from "../utils/christopher-nolan.jpg";
import OldmanImage from "../utils/gary-oldman.jpg";

const OpinionsWrapper = styled.section`
    padding-top: 5rem;
    padding-bottom: 5rem;
    background-color: #f6f6f6;
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

const TestimonialContainer = styled.div`
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    
    @media screen and (min-width: 960px) {
        max-width: 860px;
        margin-left: auto;
        margin-right: auto;
    }
    
    @media screen and (min-width: 1200px) {
        max-width: 1140px;
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
        content: "Let's see...";
        position: absolute;
        top: -3rem;
        left: -3rem;
        color: rgba(112,111,211, .1);
        z-index: -1;
        font-size: 6rem;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 2rem;
    margin-top: 1rem;
    
    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2,1fr);
    }
`;

const TestimonialsList = [
    {
        id: 1,
        image: ChrisImage,
        name: "Chris Evans",
        description: "What can I say? It's just the best app which I ever see in my life!"
    },
    {
        id: 2,
        image: NolanImage,
        name: "Christopher Nolan",
        description: "I had a lot of problems with my time and tasks management. With ToDo App I don't have them anymore..."
    },
    {
        id: 3,
        image: OldmanImage,
        name: "Gary Oldman",
        description: "When I was preparing for the Winston Churchill role in 'Darkest Hour' I really needed something which will help me to management my day. Then I found ToDo App."
    }
];

const Opinions = () => {
    return (
        <OpinionsWrapper name={"testimonials"}>
            <Container>
                <SectionTitle>What people say</SectionTitle>
            </Container>
            <TestimonialContainer>
                <Content>
                    {TestimonialsList.map(item =>
                        <OpinionItem key={item.id} image={item.image} name={item.name} description={item.description} />
                    )}
                </Content>
            </TestimonialContainer>
        </OpinionsWrapper>
    )
};

export default Opinions;