import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
import EditUserForm from "./EditUserForm";
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

class EditUser extends React.Component {
	constructor() {
		super();

		this.state = {
			first_name: "",
			last_name: "",
			email: "",
			avatar: "",
			file: [],
			description: "",
			response: [],
			loading: false
		};

		this.closeModalByESC = this.closeModalByESC.bind(this);
	}

	closeModalByESC = (event) => {
		if (event.keyCode === 27) {
			document.querySelector("#closeModal").click();
		}
	}

	updateFile = (e) => {
		this.setState({ [e.target.name]: e.target.files[0], avatar: e.target.files.length > 0 ? URL.createObjectURL(e.target.files[0]) : "http://localhost:44912/uploads/avatardefault.png" });
	}

	updateData = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount = () => {
		this.setState({ loading: true });
		axios.get("http://localhost:44912/api/user/edit/" + this.props.userId, { withCredentials: true })
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

	editProfile = (e) => {
		e.preventDefault();

		const user = new FormData();
		user.append('id', this.props.userId);
		user.append('first_name', this.state.first_name);
		user.append('last_name', this.state.last_name);
		user.append('email', this.state.email);
		user.append('description', this.state.description);
		user.append('file', this.state.file);
		
		this.setState({ loading: true });
		axios({ url: "http://localhost:44912/api/user/edit", method: "PUT", data: user, withCredentials: true })
			.then(res => {
				this.setState({ response: res.data, loading: false });
			})
			.catch(err => {
				this.setState({ response: err, loading: false });
			});
	}

	render() {
		return (
			<Overlay>
				<Modal>
					<ModalHeader>
						<ModalHeading><span>Edit</span> profile</ModalHeading>
					</ModalHeader>
					<form>
						<ModalBody>
							{this.state.loading ?
								<SpinnerLayer>
									<ClockLoader loading={this.props.loading} color={"#706fd3"} size={80} />
								</SpinnerLayer>
								:
								<>
									{this.state.response.status !== undefined && !this.state.loading ? <ValidationMessage type={this.state.response.type} message={this.state.response.message} /> : null}
									<EditUserForm 
										first_name={this.state.first_name} 
										last_name={this.state.last_name} 
										email={this.state.email} 
										avatar={this.state.avatar} 
										file={this.state.file}
										description={this.state.description} 
										updateData={this.updateData}
										updateFile={this.updateFile}
									/>
								</>
							}
						</ModalBody>
						<ModalFooter>
							<ButtonClose id="closeModal" data-action="editProfile" onClick={this.props.updateState}>Close</ButtonClose>
							{this.state.email === "" || this.state.loading ? 
								<ButtonSave onClick={this.editProfile} disabled>Save</ButtonSave> 
							: 
								<ButtonSave onClick={this.editProfile}>Save</ButtonSave>
							}
						</ModalFooter>
					</form>
				</Modal>
			</Overlay>
    	);
  	}
}

export default EditUser;