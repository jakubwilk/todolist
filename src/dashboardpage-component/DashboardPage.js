import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import DashboardNavigation from "./../dashboard-component/DashboardNavigation";
import EditUser from "./../user-component/EditUser";

class DashboardPage extends React.Component {
    state = {
        editProfile: false,
        createList: false,
        createTask: false,
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
                <h1>Dashboard</h1>
                {this.state.editProfile ? <EditUser userId={this.props.userId} updateState={this.updateState} focus={this.state.editProfile} /> : null}
            </>
        );
    }
}

export default DashboardPage;
