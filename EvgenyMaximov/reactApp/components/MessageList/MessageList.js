import React from "react";

import { Message } from "../Message";

export const MessagesList = (props) => {
  if (props.messages.length === 0) {
    return <h2 className={props.class}>Сообщений нет...</h2>;
  } else
    return props.messages.map((item) => <Message {...item} key={item.id} />);
};
