import React from "react";
import ClearAllIcon from "@material-ui/icons/ClearAll";

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
    listItem.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  clearChat = () => {
    const chatId = this.props.messages[0].chatId;
    this.props.onClearChat(chatId);
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
      onMessageDelete,
      chatTitle,
      classchattitle,
    } = this.props;

    return (
      <div className="chat">
        <div className={classchattitle}>
          {chatTitle}{" "}
          {messages.length ? (
            <div className="clear-icon" onClick={this.clearChat}>
              <ClearAllIcon fontSize="small" color="secondary" />
            </div>
          ) : null}
        </div>
        <div className="messages-list" ref={this.list}>
          <MessagesList
            messages={messages}
            class={classlist}
            onDelete={onMessageDelete}
          />
        </div>
        <div className="form">
          <MessageForm onSend={onMessageSend} class={classform} />
        </div>
      </div>
    );
  }
}
