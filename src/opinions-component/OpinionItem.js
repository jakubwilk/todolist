import React from "react";
import styled from "styled-components";

const Content = styled.article`
    display: flex;
    align-items: center;
    background-color: white;
    box-shadow: -10px 10px 0px rgba(0,0,0,.05);
    border-radius: 5px;
    padding: 2rem;
`;

const ImageBox = styled.div`
    position: relative;
  
    & > img {
        border-radius: 50%;
        width: 75px;
        height: 75px;
    }
`;

const Box = styled.div`
    margin-left: 2rem;
`;

const OpinionTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1rem;
    font-family: 'Noto', sans-serif;
`;

const OpinionDescription = styled.p`
    margin-bottom: 0;
    color: #525252;
`;

const OpinionItem = ({ image, name, description }) => {
    return (
        <Content>
            <ImageBox>
                <img src={image} alt={name} />
            </ImageBox>
            <Box>
                <OpinionTitle>{name}</OpinionTitle>
                <OpinionDescription>{description}</OpinionDescription>
            </Box>
        </Content>
    )
};

export default OpinionItem;