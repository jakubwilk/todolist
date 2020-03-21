import React from 'react';
import styled from 'styled-components';
import { ConfigProvider, Menu } from 'antd';

const SCNavbar = styled.nav`

`;

const SCMenu = styled(Menu)`
  border-bottom: 0;
`;

class Navigation extends React.Component {
  state = {
    current: 'home',
  };

  setCurrentLink = e => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    const { current } = this.state;

    return (
      <ConfigProvider current={current}>
        <SCMenu onClick={this.setCurrentLink} selectedKeys={this.state.current} mode="horizontal">
          <Menu.Item key="home">
            Home
          </Menu.Item>
          <Menu.Item key="about">
            About
          </Menu.Item>
          <Menu.Item key="features">
            Features
          </Menu.Item>
          <Menu.Item key="try" disabled>
            Try it
          </Menu.Item>
          <Menu.Item key="testimonials">
            What people say
          </Menu.Item>
        </SCMenu>
      </ConfigProvider>
    );
  }
}

export default Navigation;