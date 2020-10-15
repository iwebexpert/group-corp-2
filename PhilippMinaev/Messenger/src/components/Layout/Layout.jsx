import React, { Component } from "react";

import { MessengerContainer } from "../../containers/MessengerContainer";
import { ProfileContainer } from "../../containers/ProfileContainer";
import { HeaderContainer } from "../../containers/HeaderContainer";
import { ChatsListContainer } from "../../containers/ChatsListContainer";

import { Paper } from "@material-ui/core";

import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Error } from "../../pages/Error";

import "./Layout.css";

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.style = {
      width: "100%",
      marginTop: "25px",
      display: "flex",
      justifyContent: "space-between",
      height: "500px",
      fontFamily: "Courier Prime",
      backgroundColor: "black",
    };
  }

  render() {
    return (
      <>
        <div className="container">
          <HeaderContainer />
          <div style={this.style}>
            <Paper elevation={3} style={{ width: "30%" }}>
              <ChatsListContainer />
            </Paper>
            <Paper elevation={3} style={{ width: "69%" }}>
              <Switch>
                <Route
                  exact
                  path="/chats/:id([0-9]+)"
                  component={MessengerContainer}
                />
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/chats/0" />}
                />
                <Route exact path="/profile" component={ProfileContainer} />
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
            </Paper>
          </div>
        </div>
      </>
    );
  }
}
