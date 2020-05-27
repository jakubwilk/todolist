import React from "react";
import DashboardNavigation from "./../dashboard-component/DashboardNavigation";

class DashboardPage extends React.Component {
    state = {
        editProfile: false,
        createList: false,
        createTask: false,
        loading: false
    };

	componentDidMount = () => {
        document.title = "ToDo List - Your new TODO tool";
    }

    updateState = (e) => {
        const attrName = e.target.getAttribute('data-action');
        const attrValue = e.target.getAttribute('data-value');
        this.setState({ [attrName]: attrValue });
    }

	render() {
        return (
            <>
                <DashboardNavigation userId={this.props.userId} />
                <h1>Dashboard</h1>
            </>
        );
    }
}

export default DashboardPage;
