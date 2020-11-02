import React from 'react';
import {MyMessage} from "./messages/messagesTypes/MyMessage";
import {CompanionMessage} from "./messages/messagesTypes/CompanionMessage";

type MessageListProps = {
    message: messagePayload
    key: string
}

export const Message: React.FC<MessageListProps> = ({message, key}) => {
    return message.type === "myMsg" ? <MyMessage msg={message}/> : <CompanionMessage msg={message}/>;
}