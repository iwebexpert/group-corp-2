import React from "react";
import { Switch, Route } from "react-router-dom";

import { Messenger } from "../Messenger";
import { Home } from "../../src/pages/Home";
import { Profile } from "../../src/pages/Profile";
import { Error } from "../../src/pages/Error";

export const AppRoater = (props) => {
  const { classform, classlist, classchattitle, chats } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <Home class={props.classhomepage} />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route
        path="/chats/:id([0-9]+)"
        render={(props) => (
          <Messenger
            {...props}
            classform={classform}
            classlist={classlist}
            classchattitle={classchattitle}
            chats={chats}
          />
        )}
        exact
      />
      <Route path="*">
        <Error class={props.classhomepage} />
      </Route>
    </Switch>
  );
};
