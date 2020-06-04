import React from "react";

class Dashboard extends React.Component {
	componentDidMount = () => {
		document.title = "ToDo List - User dashboard";
	};

	render() {
		return <h1>Dashboard</h1>;
	}
}

export default Dashboard;
