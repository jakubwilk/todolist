import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
import EditListForm from "./EditListForm";
import ValidationMessage from "./../utils/ValidationMessage";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0, .45);
	z-index: 20;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SpinnerLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(255,255,255, .65);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
	margin: 1.5rem;
	overflow-y: auto;
	position: relative;
	z-index: 20;
	width: 100%;

	@media screen and (min-width: 768px) {
		margin-top: 0;
		margin-bottom: 0;
		max-height: 90vh;
	}

	@media screen and (min-width: 960px) {
		margin-left: auto;
    	margin-right: auto;
		max-width: 45vw;
	}
`;

const ModalHeader = styled.header`
	background-color: white;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	padding: 1.8rem 1.5rem 1rem;
	border-bottom: 1px solid #f1f1f1;
`;

const ModalHeading = styled.h2`
	font-family: 'Noto',sans-serif;
	margin-top: 0;
	margin-bottom: 0;
	text-transform: capitalize;
    font-size: 1.8rem;

	& > span {
		color: #706fd3;
	}
`;

const ModalBody = styled.section`
	position: relative;
	min-height: 150px;
	background-color: white;
	padding: 1rem 1.5rem;
	overflow-y: auto;
    max-height: 60vh;
`;

const ModalFooter = styled.footer`
	background-color: white;
	padding: 1rem 1.5rem;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	border-top: 1px solid #f1f1f1;
	display: flex;
	justify-content: flex-end;

	& > button {
		margin-left: 1.5rem;
	}
`;

const ButtonClose = styled.button`
	cursor: pointer;
    border: 0;
    border-radius: 5px;
    background-color: #f1f1f1;
    padding: .5rem 1.5rem;
    color: #2b2b2b;
	transition: all .1s ease-in-out;

	&:hover,
	&:focus {
		outline: none;
		background-color: #ccc;
	}
`;

const ButtonSave = styled.button`
	cursor: pointer;
    border: 0;
    border-radius: 5px;
    background-color: #706fd3;
    padding: .5rem 1.5rem;
    color: #fff;
	transition: all .1s ease-in-out;

	&:hover,
	&:focus {
		outline: none;
		background-color: #5959a9;
	}

	&[disabled] {
		user-select: none;
		pointer-events: none;
		opacity: .6;
	}
`;

class EditList extends React.Component {
    state = {
        title: "",
        description: "",
        author: "",
        finished: false,
        response: [],
        loading: false
    };
    

    updateData = (e) => {
		this.setState({ [e.target.name]: e.target.value });
    }
    
    componentDidMount = () => {
        console.log(this.props.listId);
        if (this.props.listId !== 0) {
            this.setState({ loading: true });
            axios.get("http://localhost:44912/api/userlist/edit/" + this.props.listId, { withCredentials: true })
                .then(res => {
                    const list = res.data.message;
                    this.setState({ title: list.title, description: list.description, author: list.author, finished: list.finished, loading: false });
                })
                .catch(err => {
                    this.setState({ loading: false });
                });
        }
    }

    editList = (e) => {
        e.preventDefault();

        const list = {
            title: this.state.title,
            description: this.state.description,
            author: this.props.userId,
            id: this.props.listId,
            finished: this.state.finished
        }

        this.setState({ loading: true });
        axios.post("http://localhost:44912/api/userlist/create", { list },  { withCredentials: true })
            .then(res => {
                if (res.data.type === "success") {
                    window.location.reload(false);
                } else {
                    this.setState({ response: res.data, loading: false });
                    console.log(this.state.response);
                }
            })
            .catch(err => {
                this.setState({ response: err.data, loading: false });
            })
    }

    render() {
        return (
            <Overlay>
                <Modal>
                    <ModalHeader>
                        <ModalHeading><span>Edit</span> list</ModalHeading>
                    </ModalHeader>
                    <form onSubmit={this.editList}>
                        <ModalBody>
                            {this.state.loading ?
                                <SpinnerLayer>
                                    <ClockLoader loading={this.props.loading} color={"#706fd3"} size={80} />
                                </SpinnerLayer>
                                :
                                <>
                                    {this.state.response.status !== "success" && this.state.response.status !== undefined && !this.state.loading ? 
                                        <ValidationMessage type={this.state.response.type} message={this.state.response.message} /> 
                                    : 
                                        null
                                    }
                                    <EditListForm 
                                        title={this.state.title} 
                                        description={this.state.description} 
                                        updateData={this.updateData} 
                                        listId={this.props.listId}
                                    />
                                </>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <ButtonClose type="button" id="closeModal" data-action="editList" onClick={this.props.updateState}>Close</ButtonClose>
                            {this.state.title === "" || this.state.loading ? 
                                <ButtonSave type="button" onClick={this.editList} disabled>Save</ButtonSave> 
                            : 
                                <ButtonSave type="button" onClick={this.editList}>Save</ButtonSave>
                            }
                        </ModalFooter>
                    </form>
                </Modal>
            </Overlay>  
        );
    }
}

export default EditList;