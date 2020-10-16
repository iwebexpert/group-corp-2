import React, { useEffect } from "react";
import ClearAllIcon from "@material-ui/icons/ClearAll";

import { MessageForm } from "../MessageForm";
import { MessagesList } from "../MessageList";

import "../../App.scss";

export const Messenger = (props) => {
  const list = React.createRef();

  useEffect(() => {
    if (list.current) {
      scrollChat();
    }
  });

  const scrollChat = () => {
    const listItem = list.current;
    listItem.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  const clearChat = () => {
    const chatId = props.messages[0].chatId;
    props.onClearChat(chatId);
  };

  const {
    messages,
    classlist,
    classform,
    onMessageSend,
    onMessageDelete,
    chatTitle,
    classchattitle,
    isLoading,
    isPending,
  } = props;

  return (
    <div className="chat">
      <div className={classchattitle}>
        {chatTitle ? chatTitle : <span>Waiting...</span>}
        {messages.length ? (
          <div className="clear-icon" onClick={clearChat}>
            <ClearAllIcon fontSize="small" color="secondary" />
          </div>
        ) : null}
      </div>
      <div className="messages-list" ref={list}>
        {isLoading && !chatTitle ? (
          <div className="lds-dual-ring"></div>
        ) : (
          <MessagesList
            messages={messages}
            classlist={classlist}
            onDelete={onMessageDelete}
          />
        )}
      </div>
      <div className="form">
        <MessageForm
          onSend={onMessageSend}
          classform={classform}
          isPending={isPending}
        />
      </div>
    </div>
  );
};
