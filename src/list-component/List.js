import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
import ListItem from "./ListItem";

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

const CreateButton = styled.button`
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
        background-color: #5958a9;
    }
`;

const ListGrid = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 1.5rem;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
    }

    @media screen and (min-width: 960px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
`;

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            lists: [],
            message: "",
            loading: false
        };

        this.closeModalByESC = this.closeModalByESC.bind(this);
    }

    closeModalByESC = (event) => {
		if (event.keyCode === 27) {
			document.querySelector("#closeModal").click();
		}
    }

    componentDidMount = () => {
        this.setState({ loading: true });

        axios.get("https://api.todoapp.jakubwilk.pl/api/userlist/lists/" + this.props.userId, { withCredentials: true })
            .then(res => {
                if (res.data.type === "success") {
                    this.setState({ message: "", lists: res.data.message, loading: false });
                } else {
                    this.setState({ message: res.data.message[0], loading: false });
                }
            })
            .catch(err => {
                this.setState({ message: "", loading: false });
            });

        document.addEventListener("keyup", this.closeModalByESC, false);
    }

    componentWillUnmount = () => {
		document.removeEventListener("keyup", this.closeModalByESC, false);
    }

    render() {
        return (
            <Wrapper>
                <ListContent>
                    <CreateButton data-action="editList" onClick={this.props.updateState}>Create list</CreateButton>
                    {this.state.loading ? 
                    <SpinnerLayer>
                        <ClockLoader loading={this.props.loading} color={"#706fd3"} size={80} />
                    </SpinnerLayer>
                    :
                        <>
                            {this.state.message !== "" ? 
                                <NoListMessage>{this.state.message}</NoListMessage>
                            : 
                                <ListGrid>
                                    {this.state.lists.map(list => 
                                        <ListItem 
                                            key={list._id} 
                                            id={list._id} 
                                            title={list.title} 
                                            description={list.description} 
                                            finished={list.finished} 
                                            handleClick={this.props.updateState} 
                                            handleDelete={this.props.deleteList}
                                        />
                                    )}
                                </ListGrid>
                            }
                        </>
                    }
                </ListContent>
            </Wrapper>
        );
    }
}

export default List;