import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
import TaskItem from "./TaskItem";
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

const AddTaskLayout = styled.div`
	display: flex;
    align-items: flex-end;
    justify-content: space-between;
	flex-wrap: wrap;

	@media screen and (min-width: 768px) {
		flex-wrap: nowrap;
	}

	& > .tasklist {
		margin-bottom: 1.5rem;	
    	width: 100%;

		@media screen and (min-width: 768px) {
			margin-bottom: 0;
			width: calc(100% - 130px);
		}
	}

	& input {
		max-width: 100%;
	}
`;

const AddTaskButton = styled.button`
	cursor: pointer;
    border: 0;
    border-radius: 5px;
	background-color: #badc58;
	color: #fff;
	padding: .65rem 1.5rem;
	transition: all .1s ease-in-out;
	margin-left: auto;
    margin-right: auto;

	&:hover,
	&:focus {
		outline: none;
		background-color: #6ab04c;
	}

	&[disabled] {
		user-select: none;
		pointer-events: none;
		opacity: .6;
	}

	@media screen and (min-width: 768px) {
		margin-right: 0;
	}
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
		message: "",
		response: [],
		tasks: [],
        loading: false
	}
	
	getTaskList = () => {
		this.setState({ loading: true });
		const body = {
			userId: this.props.userId,
			listId: this.props.listId
		}

		axios.get("http://localhost:44912/api/task/list/" + body.listId + "/user/" + body.userId, { withCredentials: true })
			.then(res => {
				console.log(res);
				const response = res.data;
				this.setState({ title: response.message.list.title, description: response.message.list.description });
				if (response.type === 'error') {
					this.setState({ message: response.message.text, loading: false });
				} else {
					this.setState({ message: "", tasks: response.message.tasks, loading: false });
				}
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
			})
	}

	addNewTask = () => {
		const data = {
			title: this.state.taskName,
			listId: this.props.listId
		}

		this.setState({ loading: true });
		axios.post("http://localhost:44912/api/task/create", { data }, { withCredentials: true })
			.then(res => {
				if (res.data.type === "success") {
					this.setState({ response: [], loading: false });
				} else {
					this.setState({ loading: false });
				}			
				this.getTaskList();
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
				this.getTaskList();
			});
	}

    componentDidMount = () => {
		this.getTaskList();
	}

	updateData = (e) => {
		this.setState({ taskName: e.target.value })
	}

	updateTask = (e) => {
		const taskId = e.target.getAttribute("data-id");
		const checked = e.target.checked;
		
		this.setState({ loading: true });
		axios.get("http://localhost:44912/api/task/update/" + taskId + "/" + checked, { withCredentials: true })
			.then(res => {
				this.setState({ response: res.data, loading: false });
				this.getTaskList();
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
				this.getTaskList();
			});
	}

	deleteTask = (e) => {
		const taskId = e.target.getAttribute("data-id");

		this.setState({ loading: true });
		axios.get("http://localhost:44912/api/task/delete/" + taskId, { withCredentials: true })
			.then(res => {
				this.setState({ response: res.data, loading: false });
				this.getTaskList();
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
				this.getTaskList();
			});
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
								<AddTaskLayout>
									<FormInput 
										labelFor="task" 
										labelName="Describe your task" 
										type="text" 
										name="task" 
										id="task" 
										groupClass="tasklist tasklist-title"
										value={this.state.taskName} 
										handleChange={this.updateData} 
										placeholder="Add new task" 
									/>
									{this.state.taskName === "" ?
										<AddTaskButton disabled>Add task</AddTaskButton>
									:
										<AddTaskButton onClick={this.addNewTask}>Add task</AddTaskButton>
									}
								</AddTaskLayout>
								{this.state.message !== "" ?
									<p>{this.state.message}</p>
								:
									<>
										<h4>Tasks:</h4>
										{this.state.tasks.map(task => 
											<TaskItem 
												key={task._id} 
												title={task.name} 
												finished={task.finished} 
												taskId={task._id} 
												deleteTask={this.deleteTask} 
												markTask={this.updateTask}
											/>
										)}
									</>
								}
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