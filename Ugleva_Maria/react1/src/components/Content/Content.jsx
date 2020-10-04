import React, { Component } from "react";
import "./Content.scss";
import { Route, Switch } from "react-router-dom";
import ChatsComponent from "./chatsComponent";
import Profile from "./Profile";

class Content extends Component {
  componentDidUpdate = () => {
    if (this.state.messages.length % 2 === 1) {
      setTimeout(
        () =>
          this.setState({
            messages: [
              ...this.state.messages,
              {
                text: `${
                  this.state.messages[this.state.messages.length - 1].author
                }, может попьем кофе `,
                author: "Бот",
              },
            ],
          }),
        1000
      );
    }
  };
  render() {
    return (
      <div className="content">
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/" component={ChatsComponent} />
        </Switch>
      </div>
    );
  }
}
export default Content;
