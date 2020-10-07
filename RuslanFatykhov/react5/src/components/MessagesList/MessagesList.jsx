import React from "react";
import { Message } from "../Message";

export const MessagesList = (props) => {
  return props.items.map((item) => <Message {...item} key={item.id} />);
};
