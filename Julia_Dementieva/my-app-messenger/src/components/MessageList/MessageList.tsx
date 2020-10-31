import React from 'react';
import {Message} from '../Message';
// import {MessageType} from '../Message';
type Message = {
    author: string;
    text: string;
    id?: string;
    chatId?: number;
}

type MessageType = {
    items: Array<Message>
}

export const MessageList: React.FC<MessageType> = ({items}) => {
    return (
        <>
            {items.map((item) => (<Message {...item} key={item.id} />))} 
        </>
    );
}

