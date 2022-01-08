import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AccessList from "./access-list";

const Access = ({ match }) => {

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`}/>
      <Route exact path={`${match.url}/list`}>
        <AccessList />
      </Route>
    </Switch>
  );
};

export default Access;