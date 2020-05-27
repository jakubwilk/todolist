import React from "react";
import axios from "axios";
import styled from "styled-components";

const NavHeader = styled.header`
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: #706fd3;
`;

const NavContainer = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;
`;

const Navbar = styled.nav`
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const WelcomeHeader = styled.p`
    display: flex;
    align-items: center;
    margin-top: 0;
    margin-bottom: 0;
    color: #f4f4f4;
`;

const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 5px;
`;

const Menu = styled.ul`
    display: flex;
    list-style: none;
    position: absolute;
    width: 100%;
    background-color: #fff;
    left: 0;
    top: 72px;
    padding: 1rem 1.5rem;
    justify-content: flex-end;

    @media screen and (min-width: 768px) {
        align-items: center;
        margin-top: 0;
        margin-bottom: 0;
        position: relative;
        left: auto;
        top: auto;
        width: auto;
        background-color: transparent;
        padding: 0 0 0 2rem;
    }
`;

const MenuItem = styled.li`
    margin-left: 1rem;

    &:first-child {
        margin-left: 0;
    }
`;

const MenuButton = styled.button`
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    background-color: #706fd3;
    padding: .35rem 1.5rem;
    color: #fff;

    &:hover,
    &:focus {
        outline: none;
        transition: all .1s ease-in-out;
        background-color: #fff;
        color: #2b2b2b;
    }

    @media screen and (min-width: 768px) {
        background-color: #fff;
        color: #2b2b2b;

        &:hover,
        &:focus {
            background-color: #706fd3;
            color: #fff;
        }
    }

    &.logout {
        background-color: #e74c3c;
        color: #fff;

        &:hover,
        &:focus {
            background-color: #c0392b;
        }
    }
`;

class DashboardNavigation extends React.Component {
    state = {
        username: null,
        avatar: null,
        loading: false
    };

    componentDidMount = () => {
        this.setState({ loading: true });
        axios.get("http://localhost:44912/api/auth/user/" + this.props.userId, { withCredentials: true })
            .then(res => {
                this.setState({ username: res.data.message.username, avatar: res.data.message.avatar, loading: false });
            })
            .catch(err => {
                this.setState({ username: null, avatar: null, loading: false });
            });
    }

    render() {
        return (
            <NavHeader>
                <NavContainer>
                    <Navbar>
                        {this.state.loading ? null : <WelcomeHeader>Welcome, <UserAvatar src={this.state.avatar} alt={this.state.username} /> <strong>{this.state.username}</strong></WelcomeHeader>}
                        <Menu>
                            <MenuItem>
                                <MenuButton>Edit profile</MenuButton>
                            </MenuItem>
                            <MenuItem>
                                <MenuButton className="logout">Logout</MenuButton>
                            </MenuItem>
                        </Menu>
                    </Navbar>
                </NavContainer>
            </NavHeader>
        );
    }
}

export default DashboardNavigation;