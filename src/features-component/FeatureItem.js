import React from "react";
import styled from "styled-components";

const Content = styled.article`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
    
    &:nth-child(even) {
        flex-direction: row-reverse;
        
        & > div:last-child {
            margin-right: 25px;
            text-align: right;
        }
    }
`;

const Icon = styled.div`
    width: 80px;
    height: 80px;
    padding: 1rem;
    border-radius: 5px;
    background-color: white;
    box-shadow: -10px 10px 0px rgba(0,0,0,.05);
    display: flex;
    align-items: center;
    justify-content: center;
    
    & > svg {
        height: 80px;
    }
    
    @media screen and (min-width: 768px) {
        width: 160px;
        height: 160px;
        padding: 2rem;
    }
`;

const Box = styled.div`
    margin-left: 15px;
`;

const FeatureTitle = styled.h3`
    font-family: 'Noto',sans-serif;
    position: relative;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    z-index: 10;
    color: #2b2b2b;
`;

const FeatureDescription = styled.p`
    margin-bottom: 0;
`;

const FeatureItem = ({ icon, title, description }) => {
    return (
        <Content>
            <Icon>
                {icon}
            </Icon>
            <Box>
                <FeatureTitle>{title}</FeatureTitle>
                <FeatureDescription>{description}</FeatureDescription>
            </Box>
        </Content>
    )
};

export default FeatureItem;