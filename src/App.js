import React from 'react';
import {Switch, Route, Redirect} from "react-router";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";

const app = () => {
  return (
    <div className="App">
      <Switch>
      <Route path = "/auth" component = {Auth} />
      <Route path = "/" component = {Home} />
      <Redirect to = "/" component = {Home} />
      </Switch>
    </div>
  );
}

export default app;
