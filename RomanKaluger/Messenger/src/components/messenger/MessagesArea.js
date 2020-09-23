import React from "react";
import {useSelector} from "react-redux";
import Message from "./Message";

export default () => {
    const messages = useSelector(s => s.app.chats.id1);
    return (
        <div className={'MessagesArea'}>
            {messages.map(msg => <Message message={msg}/>)}
        </div>
    );
}
