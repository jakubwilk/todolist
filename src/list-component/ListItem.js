import React from "react";
import styled from "styled-components";

const Item = styled.div`
    min-height: 150px;
    padding: 1.5rem 1.5rem .5rem;
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

const ItemContent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

const ItemMenu = styled.ul`
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;

    & > li {
        margin-left: 1rem;

        &:first-child {
            margin-left: 0;
        }
    }
`;

const ButtonMenu = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #fff;
    font-size: .85rem;
    opacity: .7;
    transition: all .1s ease-in-out;

    &:hover,
    &:focus {
        outline: none;
        opacity: 1;
    }
`;

const Badge = styled.span`
    position: absolute;
    right: -2rem;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    color: white;
    font-size: .75rem;
    padding: 2px 5px;
    background-color: #e74c3c;

    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        right: 0;
        width: 0;
        height: 0;
        border-top: 8px solid #c0392b;
        border-right: 8px solid transparent;
    }
`;

class ListItem extends React.Component {
    render() {
        return (
            <Item>
                <ItemContent>
                    {this.props.finished ? <Badge>Finished</Badge> : null}
                    <>
                        <ItemTitle>{this.props.title}</ItemTitle>
                        <ItemDescription>{this.props.description}</ItemDescription>
                    </>
                    <ItemMenu>
                        <li>
                            <ButtonMenu data-action="editList" data-id={this.props.id} onClick={this.props.handleClick}>Edit</ButtonMenu>
                        </li>
                        <li>
                            <ButtonMenu>Delete</ButtonMenu>
                        </li>
                    </ItemMenu>
                </ItemContent>
            </Item>
        );
    }
}

export default ListItem;