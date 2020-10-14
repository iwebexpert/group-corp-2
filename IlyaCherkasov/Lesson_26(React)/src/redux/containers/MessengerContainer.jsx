import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Messenger from '../../components/Messenger/Messenger'

const MessengerContainer = () => {
    const chats = useSelector((state) => state.chats.entries);
    const { id } = useParams();
    let messages;
    if (chats[id] !== undefined) {
        messages = chats[id].messages;
    }
    return <Messenger messages={messages} />
}

export default MessengerContainer;