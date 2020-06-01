import React from "react";
import axios from "axios";
import styled from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";

class EditList extends React.Component {
    constructor() {
		super();

		this.state = {
			title: "",
            description: "",
            author: "",
			finished: false,
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

    // componentDidMount = () => {
    //     this.setState({ loading: true });
	// 	axios.get("http://localhost:44912/api/userlist/edit/" + this.props.listId, { withCredentials: true })
	// 		.then(res => {
	// 			const user = res.data.user;
	// 			// this.setState({ first_name: user.first_name, last_name: user.first_name, email: user.email, avatar: user.avatar, description: user.description, loading: false });
	// 		})
	// 		.catch(err => {
	// 			this.setState({ loading: false });
    //         });
            
    //     if (this.props.focus) {
	// 		document.querySelector("button[data-action=editList]").blur();
	// 	}

	// 	document.addEventListener("keyup", this.closeModalByESC, false);
    // }
    
    componentWillUnmount = () => {
		document.removeEventListener("keyup", this.closeModalByESC, false);
    }
    
    editList = (e) => {
        e.preventDefault();

        const list = {
            title: this.state.title,
            description: this.state.description,
            author: this.props.userId,
            finished: this.state.finished
        }

        this.setState({ loading: true });
        axios.get("http://localhost:44912/api/userlist/create", { withCredentials: true })
            .then(res => {
                console.log(res);
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <>
                List
            </>
        )
    }
}

export default EditList;