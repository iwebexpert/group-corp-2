import React from 'react';
import {Message} from './Messages';

type MessageCheckProps = {
    items: messagePayload[]
}

export const MessagesCheck: React.FC<MessageCheckProps> = ({items}) => {
    return (
        <>
            {items.map((item) => (<Message message={item} key={item.id}/>))}
        </>
    );
}