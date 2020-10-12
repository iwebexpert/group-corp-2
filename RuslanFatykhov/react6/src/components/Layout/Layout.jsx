import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Home } from "pages/Home";
import { About } from "pages/About";
import { Error } from "pages/Error";
import { MessengerContainer } from "containers/MessengerContainer";
import { ProfileContainer } from "containers/ProfileContainer";

export const Layout = (props) => {
    return (
      <Switch>
        <Route path="/" component={MessengerContainer} exact />
        <Route path="/about" component={About} exact />
        <Route path="/profile" component={ProfileContainer} exact />
        <Route path="/chats/:id([0-9]+)" component={MessengerContainer} exact />
        <Route path="*" component={Error} />
      </Switch>
    );
  };
