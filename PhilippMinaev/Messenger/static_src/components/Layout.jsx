import React from "react";
import ChatList from "./ChatList";
import Header from "./Header";
import MessageField from "./MessageField";
import "../styles/style.css";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <ChatList />
          <MessageField />
        </div>
      </div>
    );
  }
}
