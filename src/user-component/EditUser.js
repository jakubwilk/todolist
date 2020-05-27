import React from "react";
import axios from "axios";
import styled from "styled-components";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0, .45);
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Modal = styled.div`
	margin: 1.5rem;
	overflow-y: auto;
	position: relative;
	z-index: 20;

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
	background-color: white;
	padding: 1rem 1.5rem;
`;

const ModalFooter = styled.footer`
	background-color: white;
	padding: 1rem 1.5rem;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
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
`;

class EditUser extends React.Component {
	constructor() {
		super();

		this.state = {
			data: {
				first_name: '',
				last_name: '',
				email: '',
				avatar: '',
				description: ''
			},
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
		axios.get("http://localhost:44912/api/auth/edit/" + this.props.userId, { withCredentials: true })
			.then(res => {
				const user = res.data.user;
				this.setState({ first_name: user.first_name, last_name: user.first_name, email: user.email, avatar: user.avatar, description: user.description, loading: false });
			})
			.catch(err => {
				this.setState({ loading: false });
			});

		if (this.props.focus) {
			document.querySelector("button[data-action=editProfile]").blur();
		}

		document.addEventListener("keyup", this.closeModalByESC, false);
	}

	componentWillUnmount = () => {
		document.removeEventListener("keyup", this.closeModalByESC, false);
	}

	editProfile = () => {
		// send data for edit profile
	}

	render() {
		return (
			<>
				<Overlay></Overlay>
				<Modal>
					<ModalHeader>
						<ModalHeading><span>Edit</span> profile</ModalHeading>
					</ModalHeader>
					<ModalBody></ModalBody>
					<ModalFooter>
						<ButtonClose id="closeModal" data-action="editProfile" onClick={this.props.updateState}>Close</ButtonClose>
						<ButtonSave>Save</ButtonSave>
					</ModalFooter>
				</Modal>
			</>
    	);
  	}
}

export default EditUser;