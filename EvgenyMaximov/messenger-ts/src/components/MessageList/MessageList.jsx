import React from "react";
import { Message } from "../Message/Message";

export const MessagesList = ({messages, classlist, onDelete})=> {
  if (!messages || messages.length === 0) {
    return <h2 className={classlist}>Сообщений нет...</h2>;
  } else
    return messages.map((item) => (
      <Message {...item} key={item.id} onDelete={onDelete} />
    ));
};
