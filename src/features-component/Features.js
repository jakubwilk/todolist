import React from "react";
import styled from "styled-components";

import FeatureItem from './FeatureItem';
import CashIcon from "../utils/CashIcon";
import MultiTaskIcon from "../utils/MultiTaskIcon";
import PinIcon from "../utils/PinIcon";
import TimeIcon from "../utils/TimeIcon";

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

const Content = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-gap: 2.5rem;
`;

const FeaturesList = [
    {
        id: 1,
        icon: <CashIcon/>,
        title: "No Cash",
        description: "Do you know what is the best? All features are free! You don't have to pay nothing. We don't want your money!"
    },
    {
        id: 2,
        icon: <MultiTaskIcon/>,
        title: "Unlimited tasks",
        description: "In our application we don't want to tell how much you should do. There is no limit for your tasks of day."
    },
    {
        id: 3,
        icon: <PinIcon/>,
        title: "Mark important things",
        description: "It doesn't matter if you have any troubles with finding important tasks on other ToDo apps. Now you don't have to care about it, because you have one of many our features!"
    },
    {
        id: 4,
        icon: <TimeIcon/>,
        title: "Online 24/7",
        description: "We are using the best servers on the market, which they are working 24/7 even in christmas time! Everything for you."
    }
];

const Features = () => {
    return (
        <FeaturesWrapper name="features">
            <Container>
                <SectionTitle>Features</SectionTitle>
                <Content>
                    {FeaturesList.map(item =>
                        <FeatureItem
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    )}
                </Content>
            </Container>
        </FeaturesWrapper>
    )
};

export default Features;