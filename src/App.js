import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import * as actions from "./store/actions";


import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import MySessions from "./containers/MySessions/MySessions";
import Session from "./containers/Session/Session";

const App = (props) => {

  useEffect(() => {
    props.onAutoLogin();
  })

  let routes = null;
  if (!props.token) {
    routes =
      <Switch>
        <Route path="/" component={Auth} />
      </Switch>
  } else {
    routes =
      <Switch>
        <Route path="/session" component={Session} />
        <Route path="/my-sessions" component={MySessions} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
  }

  return (
    <div className="App">
        {routes}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDisptachToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDisptachToProps)(App));
