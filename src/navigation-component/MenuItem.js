import React from "react";
import styled from "styled-components";
import * as Scroll from "react-scroll";
import {Link} from "react-router-dom";

const SLink = Scroll.Link;

const Item = styled.li`
    margin-left: 2rem;
    margin-right: 2rem;
    text-align: center;
    
    @media screen and (min-width: 960px) {
        margin-right: 0;
        text-align: left;
    }
    
    &.disabled {
        & > a {
            user-select: none;
            pointer-events: none;
            color: #d6d6d6;
        }
    }
`;

const SItemLink = styled(SLink)`
    text-decoration: none;
    color: #2b2b2b;
    transition: all .1s ease-in-out;
    font-size: 2.5rem;
    cursor: pointer;
    
    @media screen and (min-width: 960px) {
        font-size: 1rem;
    }
    
    &:hover,
    &:active,
    &:focus,
    &.current {
        color: #706fd3;
        outline: none;
    }
`;

const ItemLink = styled(Link)`
    text-decoration: none;
    color: #2b2b2b;
    transition: all .1s ease-in-out;
    font-size: 2.5rem;
    cursor: pointer;

    @media screen and (min-width: 960px) {
        font-size: 1rem;
    }

    &:hover,
    &:active,
    &:focus,
    &.current {
        color: #706fd3;
        outline: none;
    }
`;

const MenuItem = ({href, title, rel, handleClick, status, name, disabled, sameSite}) => {
    return (
        <Item className={disabled ? 'disabled' : ''}>
            {sameSite ?
                <SItemLink className={status === rel ? 'current' : ''} to={href} title={title} rel={rel}
                           onClick={handleClick} spy={true} smooth={true}>{name}</SItemLink>
                :
                <ItemLink className={status === rel ? 'current' : ''} to={href} title={title} rel={rel}
                          onClick={handleClick}>{name}</ItemLink>
            }
        </Item>
    );
};

export default MenuItem;