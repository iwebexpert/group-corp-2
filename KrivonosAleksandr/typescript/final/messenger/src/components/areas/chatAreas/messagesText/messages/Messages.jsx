import React, {Component} from 'react';
import MyMessage from "./messages/messagesTypes/MyMessage";
import CompanionMessage from "./messages/messagesTypes/CompanionMessage";

// type MessageListProps = {
//     items: messagePayload
// }

export const Message = ({message}) => {
    console.log(message);
    return message.type === "myMsg" ? <MyMessage msg={message}/> : <CompanionMessage msg={message}/>;
}