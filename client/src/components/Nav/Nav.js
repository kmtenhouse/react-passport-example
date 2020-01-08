import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <span className="navbar-brand">Navbar</span>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/home" className="nav-link">Home  <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/login" className="nav-link">Log In</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default Nav;