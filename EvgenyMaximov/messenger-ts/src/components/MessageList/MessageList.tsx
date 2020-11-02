import React from "react";
import { Message } from "../Message/Message";

type MessagesListProps = {
	messages: MessageType[],
	classlist: string,
	onDelete: (id:string) => void,
};

export const MessagesList:React.FC<MessagesListProps> = ({ messages, classlist, onDelete })=> {
  if (!messages || messages.length === 0) {
    return <h2 className={classlist}>Сообщений нет...</h2>;
  } else
	 return <>
	 {messages.map((item) => (
      <Message {...item} key={item.id} onDelete={onDelete} />
    ))}
	 </>
	 
};
