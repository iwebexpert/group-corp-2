import React from "react";

import { MessengerContainer } from "../../containers/MessengerContainer";
import { ProfileContainer } from "../../containers/ProfileContainer";
import { HeaderContainer } from "../../containers/HeaderContainer";
import { ChatsListContainer } from "../../containers/ChatsListContainer";

import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Error } from "../../pages/Error";

import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <>
      <div className="container">
        <HeaderContainer />
        <div className="content">
          <div className="chatListContainer">
            <ChatsListContainer />
          </div>
          <div className="messengerContainer">
            <Switch>
              <Route
                exact
                path="/chats/:id([0-9]+)"
                component={MessengerContainer}
              ></Route>
              <Route exact path="/" render={() => <Redirect to="/chats/0" />} />
              <Route exact path="/profile" component={ProfileContainer} />
              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};
