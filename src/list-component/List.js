import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";

const Wrapper = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;

    @media screen and (min-width: 960px) {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        max-width: 80vw;
    }
`;

const ListContent = styled.div`
    margin-top: 69px;

    @media screen and (min-width: 768px) {
        margin-top: 2rem;
    }
`;

const SpinnerLayer = styled.div`
    position: absolute;
    top: 141px;
    left: 0;
    width: 100%;
    height: calc(100% - 141px);
    z-index: 10;
    background-color: rgba(255,255,255, .65);
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 768px) {
        top: 72px;
        height: calc(100% - 72px);
    }
`;

const NoListMessage = styled.h2`
    color: #525252;
    margin-top: 0;
    margin-bottom: 0;
`;

const MenuButton = styled.button`
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    background-color: #706fd3;
    padding: .35rem 1.5rem;
    margin-bottom: 1.5rem;
    color: #fff;
    transition: all .1s ease-in-out;

    &:hover,
    &:focus {
        outline: none;
        background-color: #fff;
        color: #2b2b2b;
    }
`;

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            lists: [],
            message: "",
            loading: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true });

        axios.get("http://localhost:44912/api/userlist/lists/" + this.props.userId, { withCredentials: true })
            .then(res => {
                this.setState({ message: res.data.message[0], loading: false });
            })
            .catch(err => {
                this.setState({ message: err.data.message[0], loading: false });
            });
    }

    render() {
        return (
            <Wrapper>
                <ListContent>
                    <MenuButton data-action="editList">Create list</MenuButton>
                    {this.state.loading ? 
                    <SpinnerLayer>
                        <ClockLoader loading={this.props.loading} color={"#706fd3"} size={80} />
                    </SpinnerLayer>
                    :
                        <>
                            {this.state.lists.length === 0 ? 
                                <NoListMessage>{this.state.message}</NoListMessage>
                            : 
                                <>Lists</>
                            }
                        </>
                    }
                </ListContent>
            </Wrapper>
        );
    }
}

export default List;