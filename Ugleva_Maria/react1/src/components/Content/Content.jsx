import React, { Component } from "react";
import "./Content.scss";
import { Route, Switch } from "react-router-dom";
import ChatsComponent from "./chatsComponent";
import Profile from "./Profile";

const Content = () => {
    return (
      <div className="content">
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/" component={ChatsComponent} />
        </Switch>
      </div>
    );
}
export default Content;
