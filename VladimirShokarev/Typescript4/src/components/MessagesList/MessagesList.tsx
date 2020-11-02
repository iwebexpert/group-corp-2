import React from "react";
import { Message, messageType } from "../Message";

type MessagesListType = {
    items: Array<MessageType>;
};

export const MessagesList: React.FC<MessagesListType> = (props) => {
    return <>
    {props.items.map((item) => (<Message text={item.text} author={item.author} key={item.id} />))}
    </>
};