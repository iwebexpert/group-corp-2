import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Messenger from '../../components/Messenger/Messenger'

import { DefaultChatsRootState, ChatListid, ChatsType, MessagesType } from '../../types'

const MessengerContainer: React.FC<{}> = () => {
    const chats: ChatsType[] = useSelector((state: DefaultChatsRootState) => state.chats.entries);
    const { id }: ChatListid = useParams();
    let messages: MessagesType[] | null = null;

    if (chats[+id] !== undefined) {
        messages = chats[+id].messages;
    }
    return <Messenger messages={messages} />
}

export default MessengerContainer;