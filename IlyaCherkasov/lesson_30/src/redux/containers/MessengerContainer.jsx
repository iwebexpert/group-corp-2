import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Messenger from '../../components/Messenger/Messenger'

const MessengerContainer = () => {
    const chats = useSelector((state) => state.chats.entries);
    const { id } = useParams();
    let messages = null;
    /*Здесь исправил undefined на null
    Проверяю на нахождение в чате, если мы в чате, то в мессенджер передаем
    сообщения данного чата, иначе вызываем 'Выберите сообщения'*/
    if (chats[id] !== undefined) {
        messages = chats[id].messages;
    }
    return <Messenger messages={messages} />
}

export default MessengerContainer;