import React from "react";

function Members() {
    return (
        <div className="container">
        <div className="row">
            <div className="jumbotron col-12">
                <h1 className="display-4">Members Only!</h1>
                <p className="lead">This content should only show up when you are logged in.</p>
            </div>
        </div>
    </div>
    );
}

export default Members;