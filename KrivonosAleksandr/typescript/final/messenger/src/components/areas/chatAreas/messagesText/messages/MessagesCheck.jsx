import React from 'react';

import {Message} from './Messages';

// type MessageCheckProps = {
//     items: messagePayload[]
// }

export const MessagesCheck = ({items}) => {
    return ( items.map((item) => (<Message message={item} />))
        // <>
        //     {items.map((item) => (<Message id={item.id} chatId={item.chatId } text={item.text} time={item.time} type={item.type} key={item.id} />))}
        // </>
    );
}