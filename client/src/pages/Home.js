import React from "react";

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="jumbotron col-12">
                    <h1 className="display-4">Hello, world!</h1>
                    <p className="lead">This is our home page :)</p>
                    <hr className="my-4" />
                    <p>It uses utility classNames for typography and spacing to space content out within the larger container.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;