import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

/* Import pages */
import Home from "./pages/Home";
import Members from "./pages/Members";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Import components */
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/members">
          <Members />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
