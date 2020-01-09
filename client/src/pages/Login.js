import React from "react";
import API from "../utils/API";

class Login extends React.Component {
    state = {
        email: "",
        password: ""
    };

    handleChange = event => {
        event.preventDefault();

        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { email, password } = this.state; //grab the current state for email and password

        API.login(email, password)
            .then(result => {
                this.props.onSuccess(result.data);
            })
            .catch(err => console.log(err.message));
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 card">
                        <div className="card-body">
                            <h5 className="card-title">Log In</h5>
                            <p className="card-text">Please login to continue.</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;