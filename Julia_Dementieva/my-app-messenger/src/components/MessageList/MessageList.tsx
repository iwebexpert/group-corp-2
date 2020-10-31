import React from 'react';
import {Message} from '../Message';
import {MessageFullInfoType} from '../../types/types';

type MessageType = {
    items: Array<MessageFullInfoType>
};

export const MessageList: React.FC<MessageType> = ({items}) => {
    return (
        <>
            {items.map((item) => (<Message {...item} key={item.id} />))} 
        </>
    );
}

