import React from "react";
import Message from "./Message";

const MessagesList = (props) => {
  return props.messages.map((message, index) => (
    <Message message={message.message} author={message.author} key={index} />
  ));
};

export default MessagesList;
