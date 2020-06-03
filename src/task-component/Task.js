import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
import ValidationMessage from "./../utils/ValidationMessage";
import FormInput from "./../utils/FormInput";

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

const ListText = styled.p`
	margin-bottom: 0;
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

class Task extends React.Component {
    state = {
		title: "",
		description: "",
		taskName: "",
		response: [],
		tasks: [],
        loading: false
    }

    componentDidMount = () => {
		this.setState({ loading: true });
		const body = {
			userId: this.props.userId,
			listId: this.props.listId
		}

		axios.get("http://localhost:44912/api/task/list/" + body.listId + "/user/" + body.userId, { withCredentials: true })
			.then(res => {
				console.log(res.data.list);
				this.setState({ title: res.data.list.title, description: res.data.list.description, loading: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
			})
    }

    render() {
        return (
            <Overlay>
                <Modal>
                    <ModalHeader>
                        <ModalHeading>{this.state.title}</ModalHeading>
						<ListText>{this.state.description}</ListText>
                    </ModalHeader>
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
								<FormInput 
									labelFor="task" 
									labelName="Add Task" 
									type="text" 
									name="task" 
									id="task" 
									groupClass="tasklist tasklist-title"
									value={this.state.taskName} 
									handleChange={this.props.updateData} 
									placeholder="Add new task" 
								/>
                            </>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <ButtonClose type="button" id="closeModal" data-action="editTask" onClick={this.props.updateState}>Close</ButtonClose>
                    </ModalFooter>
                </Modal>
            </Overlay>  
        );
    }
}

export default Task;