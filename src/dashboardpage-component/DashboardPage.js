import React, { useEffect } from "react";
import DashboardNavigation from "./../dashboard-component/DashboardNavigation";

const DashboardPage = ({ userId }) => {
	useEffect(() => {
		document.title = "ToDo List - Your new TODO tool";
	}, []);

	return (
		<>
            <DashboardNavigation userId={userId} />
			<h1>Dashboard</h1>
		</>
	);
}

export default DashboardPage;
