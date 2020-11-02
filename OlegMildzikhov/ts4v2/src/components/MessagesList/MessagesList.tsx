import React from 'react';

import {Message} from '../Message';

type MessagesListProps = {
    items: MesageType[];
};

export const MessagesList: React.FC<MessagesListProps> = ({items}) => {
    return (
    <div className={'messages__wrapper'}>
        {items.map((item) => (<Message {...item} key={item.id} />))}
    </div>
    );
};
