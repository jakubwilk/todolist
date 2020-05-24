import React from "react";
import axios from "axios";

class DashboardNavigation extends React.Component {
    state = {
        data: [],
        loading: false
    };

    componentDidMount = () => {
        this.setState({ loading: true });
        axios.get("http://localhost:44912/api/auth/user/" + this.props.userId, { withCredentials: true })
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ data: err.data, loading: false });
            });
    }

    render() {
        return (
            <h1>Navbar</h1>
        );
    }
}

export default DashboardNavigation;