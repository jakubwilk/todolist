import React from "react";
import styled from "styled-components";

const Item = styled.div`
    min-height: 150px;
    padding: 1.5rem;
    background-color: #706fd3;
    border-radius: 5px;
`;

const ItemTitle = styled.h3`
    font-family: 'Noto', sans-serif;
    color: #fff;
    margin-top: 0;
    margin-bottom: 0;
`;

const ItemDescription = styled.p`
    color: #f4f4f4;
    margin-bottom: 0;
`;

class ListItem extends React.Component {
    render() {
        return (
            <Item>
                <ItemTitle>{this.props.title}</ItemTitle>
                <ItemDescription>{this.props.description}</ItemDescription>
            </Item>
        );
    }
}

export default ListItem;