import React from "react";
import axios from "axios";

class Members extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    componentDidMount() {
        //do an axios call to grab our secret message!
        axios.get("/api/protected")
            .then(result => this.setState({ message: result.data.message }))
            .catch(err => {
                console.log(err);
                this.props.onError();
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <h1 className="display-4">{this.state.message || ''}, {this.props.user.email}</h1>
                        <p className="lead">This content should only show up when you are logged in.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Members;