import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import DashboardNavigation from "./../dashboard-component/DashboardNavigation";
import EditUser from "./../user-component/EditUser";
import List from "./../list-component/List";
import EditList from "./../list-component/EditList";
import Task from "./../task-component/Task";
import ValidationMessage from "../utils/ValidationMessage";

const ValidationBox = styled.div`
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    margin-left: -20vw;
    width: 40vw;
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

class DashboardPage extends React.Component {
    state = {
        editProfile: false,
        editList: false,
        editListId: 0,
        editTask: false,
        logout: false,
        response: [],
        loading: false
    };

	componentDidMount = () => {
        document.title = "ToDo List - Your new TODO tool";

        if (this.state.render) {
            this.forceUpdate();
        }
    }

    updateState = (e) => {
        const editListId = e.target.getAttribute('data-id');
        if (editListId !== null) {
            this.setState({ editListId: editListId });
        } else {
            this.setState({ editListId: 0 });
        }

        const attrName = e.target.getAttribute('data-action');
        this.setState({ [attrName]: !this.state[attrName] });
    }

    logoutUser = () => {
        this.setState({ loading: true });
        axios.get("http://localhost:44912/api/auth/logout/", { withCredentials: true })
            .then(res => {
                this.setState({ logout: true, loading: false });
            })
            .catch(err => {
                this.setState({ logout: true, loading: false });
            });
    }

    deleteUserList = (e) => {
        this.setState({ loading: true });
        axios.get("http://localhost:44912/api/userlist/delete/" + e.props.id, { withCredentials: true })
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({ loading: false });
                } else {
                    this.setState({ response: res.data, loading: false });
                }
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

	render() {
        if (this.state.logout) {
            return <Redirect to="/" />
        }

        return (
            <>
                {this.state.loading ?
                    <SpinnerLayer>
                        <ClockLoader loading={this.props.loading} color={"#706fd3"} size={80} />
                    </SpinnerLayer>
                :
                    <>
                        <DashboardNavigation userId={this.props.userId} updateState={this.updateState} logoutAction={this.logoutUser} />
                        {this.state.editProfile ? <EditUser userId={this.props.userId} updateState={this.updateState} focus={this.state.editProfile} /> : null}
                        {this.state.editList ? <EditList userId={this.props.userId} updateState={this.updateState} listId={this.state.editListId} /> : null }
                        {this.state.editTask ? <Task userId={this.props.userId} updateState={this.updateState} listId={this.state.editListId} /> : null}
                        <List userId={this.props.userId} updateState={this.updateState} deleteList={this.deleteUserList} />
                        {this.state.response.length === 0 ? 
                            null
                        :
                            <ValidationBox>
                                <ValidationMessage type={this.state.response.type} message={this.state.response.message} />
                            </ValidationBox>
                        }   
                    </>
                }
            </>
        );
    }
}

export default DashboardPage;
