import "@assets/scss/global.scss";
import "./App.scss";
import Navbar from "@components/NavBar";
import Home from "./pages/Home";
import { loadUser } from "@actions/userActions";

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import React, { useEffect } from "react";
import Login from "./pages/Login";
import { connect } from "react-redux";

function _App({ user, loadUser }) {
  const loggedInUser = user?._id;
  const HomeRoute = props => {
    return !props.isLoggedInUser ? (
      <Redirect to="/login" />
    ) : (
      <Route {...props} />
    );
  };
  const LoginRoute = props => {
    return !props.isLoggedInUser ? <Route {...props} /> : <Redirect to="/" />;
  };
  useEffect(() => {
    loadUser();
  }, [loggedInUser]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <LoginRoute
            path="/login"
            isLoggedInUser={loggedInUser}
            component={Login}
          />
          <HomeRoute path="/" isLoggedInUser={loggedInUser} component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});
const mapDispatchToProps = {
  loadUser
};

export default connect(mapStateToProps, mapDispatchToProps)(_App);
