import React from 'react';
import styled from 'styled-components';

import MenuItem from './MenuItem';

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
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

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const AnchorList = [
  {
    id: 0,
    name: 'Home',
    href: '/',
    title: 'Go to homepage',
    rel: 'home',
    disabled: false,
  },
  {
    id: 1,
    name: 'About',
    href: '/#about',
    title: 'Some information about us',
    rel: 'about',
    disabled: false,
  },
  {
    id: 2,
    name: 'Features',
    href: '/#features',
    title: 'Why you should choose us',
    rel: 'features',
    disabled: false,
  },
  {
    id: 3,
    name: 'Try it',
    href: '/#try',
    title: 'Start using this awesome tool',
    rel: 'try',
    disabled: true,
  },
  {
    id: 4,
    name: 'Opinions',
    href: '/#testimonials',
    title: 'Check what people say about us',
    rel: 'testimonials',
    disabled: false,
  }
]

class Navigation extends React.Component {
  state = {
    current: 'home',
  };

  setCurrentLink = e => {
    this.setState({
      current: e.target.rel,
    });
  }

  render() {
    const { current } = this.state;

    return (
      <TopBar>
        <Container>
          <Navbar>
            <>
              Logo
            </>
            <Menu>
              {AnchorList.map(item => <MenuItem 
                key={item.id} 
                href={item.href} 
                title={item.title} 
                rel={item.rel} 
                handleClick={this.setCurrentLink} 
                status={current} 
                name={item.name}
                disabled={item.disabled} />
              )}
            </Menu>
          </Navbar>
        </Container>
      </TopBar>
    );
  }
}

export default Navigation;