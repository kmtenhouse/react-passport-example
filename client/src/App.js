import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";

/* Import pages */
import Home from "./pages/Home";
import Members from "./pages/Members";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Import components */
import Nav from "./components/Nav";

class App extends React.Component {
  state = {
    user: null
  };

  logIn = user => {
    this.setState({ user: user });
  };

  logOut = () => {
    //Make sure we do an axios call to log out from the backend...then update the state!
    axios.get("/auth/logout")
      .then(result => this.setState({ user: null }))
      .catch(err=> console.log(err));
  }

  componentDidMount() {
    //check to see if we're already logged in by asking the backend
    axios.get("/auth/whoami")
      .then(result => {
        this.setState({user: result.data })
      })
      .catch(err=> console.log(err));
  }

  render() {
    return (
      <Router>
        <Nav user={this.state.user} logOut={this.logOut} />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/members" render={() => (this.state.user !== null ? <Members user={this.state.user} onError={this.logOut} /> : <Redirect to="/login" />)} />

          <Route path="/login" render={() => (this.state.user !== null ? <Redirect to="/members" /> : <Login onSuccess={this.logIn} />)} />

          <Route path="/signup" render={() => (this.state.user !== null ? <Redirect to="/members" /> : <Signup onSuccess={this.logIn} />)} />

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
