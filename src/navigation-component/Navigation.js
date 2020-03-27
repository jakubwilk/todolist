import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import MenuItem from './MenuItem';

import Logo from './../utils/logo.png';

const TopBar = styled.div`
    background-color: white;
    height: 70px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 20;
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

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
`;

const SiteHeading = styled.h1`
    margin: 0;
    
    & > a {
        display: block;
        height: 35px;
    }
`;

const Menu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    
    &.mobile {
        display: flex;
        position: fixed;
        top: 70px;
        height: calc(100vh - 70px);
        width: 100%;
        left: 0;
        background-color: rgba(255,255,255,.95);
        flex-direction: column;
        justify-content: center;
    }
    
    &.desktop {
        display: none;
    }
    
    @media screen and (min-width: 960px) {
        &.mobile {
            display: none;
        }
    
        &.desktop {
            display: flex;
        }
    }
`;

const MenuButton = styled.button`
    border: 0;
    background-color: white;
    font-size: 1.5rem;
    font-weight: 700;
    color: #2b2b2b;
    display: flex;
    align-items: center;
    
    &:focus {
        outline: none;
        color: #706fd3;
    
        & > span,
        & > span::before,
        & > span::after {
            background-color: #706fd3;
        }
    }
    
    @media screen and (min-width: 960px) {
        display: none;
    }
`;

const MenuButtonLine = styled.span`
    display: block;
    position: relative;
    height: 2px;
    width: 25px;
    background-color: #2b2b2b;
    margin-right: 7px;
    
    &::before {
        content: '';
        position: absolute;
        height: 2px;
        width: 25px;
        background-color: #2b2b2b;
        top: -7px;
        left: 0;
    }
    
    &::after {
        content: '';
        position: absolute;
        height: 2px;
        width: 25px;
        background-color: #2b2b2b;
        top: 7px;
        left: 0;
    }
`;

const AnchorList = [
    {
        id: 0,
        name: 'Home',
        href: 'home',
        title: 'Go to homepage',
        rel: 'home',
        disabled: false,
        sameSite: true,
    },
    {
        id: 1,
        name: 'About',
        href: 'about',
        title: 'Some information about us',
        rel: 'about',
        disabled: false,
        sameSite: true,
    },
    {
        id: 2,
        name: 'Features',
        href: 'features',
        title: 'Why you should choose us',
        rel: 'features',
        disabled: false,
        sameSite: true,
    },
    {
        id: 3,
        name: 'Try it',
        href: '/try',
        title: 'Start using this awesome tool',
        rel: 'try',
        disabled: true,
        sameSite: false,
    },
    {
        id: 4,
        name: 'Opinions',
        href: 'testimonials',
        title: 'Check what people say about us',
        rel: 'testimonials',
        disabled: false,
        sameSite: true,
    }
]

class Navigation extends React.Component {
    state = {
        current: 'home',
        display: true,
    };

    setCurrentLink = e => {
        this.setState({
            current: e.target.rel,
        });
    };

    toggleMenu = () => {
        this.setState({
            display: !this.state.display
        })
    };

    render () {
        const {current, display} = this.state;

        return (
            <TopBar>
                <Container>
                    <Navbar>
                        <SiteHeading>
                            <Link to='/' title='Back to homepage'>
                                <img src={Logo} alt='todoLIST - Your ToDo list'/>
                            </Link>
                        </SiteHeading>
                        <MenuButton onClick={this.toggleMenu}>
                            <MenuButtonLine></MenuButtonLine>
                            Menu
                        </MenuButton>
                        <Menu className={display ? 'desktop' : 'mobile'}>
                            {AnchorList.map(item => <MenuItem
                                key={item.id}
                                href={item.href}
                                title={item.title}
                                rel={item.rel}
                                handleClick={this.setCurrentLink}
                                status={current}
                                name={item.name}
                                disabled={item.disabled}
                                sameSite={item.sameSite}/>
                            )}
                        </Menu>
                    </Navbar>
                </Container>
            </TopBar>
        );
    }
}

export default Navigation;