import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

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

  render() {
    return (
      <Router>
        <Nav user={this.state.user} />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/members" render={()=>  (this.state.user !== null ? <Members user={this.state.user} /> : <Redirect to="/login" />) } />

          <Route path="/login" render={()=>  (this.state.user !== null ? <Redirect to="/members" /> : <Login onSuccess={this.logIn} />) } />

          <Route path="/signup" render={()=>  (this.state.user !== null ? <Redirect to="/members" /> : <Signup onSuccess={this.logIn} />) } />

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
