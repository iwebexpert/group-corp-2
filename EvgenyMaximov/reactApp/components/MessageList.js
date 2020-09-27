import React from "react";
import { Message } from "./Message";

export const MessagesList = (props) => {
  return props.messages.map((item, index) => (
    <Message text={item.text} author={item.author} key={index} />
  ));
};
