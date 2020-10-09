import React from "react";

import { MessageForm } from "../MessageForm";
import { MessagesList } from "../MessageList";

import "../../App.scss";

export class Messenger extends React.Component {
  componentDidMount() {
    this.scrollChat();
  }

  list = React.createRef();
  scrollChat = () => {
    const listItem = this.list.current;
    listItem.scrollTop = 9999;
  };

  componentDidUpdate() {
    this.scrollChat();
  }

  render() {
    const {
      messages,
      classlist,
      classform,
      onMessageSend,
      chatTitle,
      classchattitle,
    } = this.props;

    return (
      <div className="chat">
        <div className={classchattitle}>{chatTitle}</div>
        <div className="messages-list" ref={this.list}>
          <MessagesList messages={messages} class={classlist} />
        </div>
        <div className="form">
          <MessageForm onSend={onMessageSend} class={classform} />
        </div>
      </div>
    );
  }
}
