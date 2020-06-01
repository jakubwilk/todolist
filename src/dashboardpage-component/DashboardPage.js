import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DashboardNavigation from "./../dashboard-component/DashboardNavigation";
import EditUser from "./../user-component/EditUser";
import List from "./../list-component/List";
import EditList from "./../list-component/EditList";

class DashboardPage extends React.Component {
    state = {
        editProfile: false,
        editList: false,
        editTask: false,
        logout: false,
        loading: false
    };

	componentDidMount = () => {
        document.title = "ToDo List - Your new TODO tool";
    }

    updateState = (e) => {
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

	render() {
        if (this.state.logout) {
            return <Redirect to="/" />
        }

        return (
            <>
                <DashboardNavigation userId={this.props.userId} updateState={this.updateState} logoutAction={this.logoutUser} />
                {this.state.editProfile ? <EditUser userId={this.props.userId} updateState={this.updateState} focus={this.state.editProfile} /> : null}
                {this.state.editProfile ? <EditList userId={this.props.userId} updateState={this.updateState} focus={this.state.editList} /> : null}
                <List userId={this.props.userId} updateState={this.updateState} focus={this.state.editList} />
            </>
        );
    }
}

export default DashboardPage;
