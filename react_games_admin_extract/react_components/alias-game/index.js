import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AliasList from "./alias-list";
import AliasDetails from "./alias-details";

const AliasGame = ({ match }) => {

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`}/>
      <Route exact path={`${match.url}/list`}>
        <AliasList />
      </Route>
      <Route exact path={`${match.url}/add`}>
        <AliasDetails />
      </Route>
      <Route exact path={`${match.url}/edit/:id`}>
        <AliasDetails />
      </Route>
    </Switch>
  );
};

export default AliasGame;