import React from "react";

class EditUser extends React.Component {
	state = {
		data: {
			first_name: '',
			last_name: '',
			email: '',
			avatar: '',
			description: ''
		},
		loading: false
	}

	componentDidMount = () => {
		// get data for edit profile
	}

	editProfile = () => {
		// send data for edit profile
	}

	render() {
		return (
			<>
				EditUser
			</>
    	);
  	}
}

export default EditUser;