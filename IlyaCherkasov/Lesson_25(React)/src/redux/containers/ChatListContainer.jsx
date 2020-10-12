import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

import urlChatIconActive from '../../img/chatIconActive.png';
import urlChatIconNewMessage from '../../img/chatIconNewM.png';
import urlChatIconNotActive from '../../img/chatIconNotActive.png';

import ChatList from '../../components/ChatList/ChatList'
import { newChatAdd, deleteChat } from '../actions/chatActions';

const ChatListContainer = () => {
    const chats = useSelector((state) => state.chats.entries);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [newChatField, setNewChatField] = useState('');

    const sendNewChat = () => {
        if (newChatField !== '') {
            dispatch(
                newChatAdd({
                    newChatID: chats.length,
                    fire: false,
                    title: newChatField,
                    messages: [],
                })
            );
            dispatch(push(`/chats/${chats.length}`))
        }
        setNewChatField('');
    };

    const fireChat = (chat, chatid) => {
        if (!chat.fire) {
            if (+id === +chatid) {
                return urlChatIconActive;
            }
            return urlChatIconNotActive;
        } else {
            return urlChatIconNewMessage;
        }
    }

    const handlerDeleteChat = (e) => {
        const chatID = +e.target.alt.slice(-1);
        if (+id === +chatID) {
            dispatch(deleteChat({ chatID }));
            dispatch(push(`/`));
            return;
        }
        if (+id > +chatID) {
            dispatch(deleteChat({ chatID }));
            dispatch(push(`/chats/${+id - 1}`));
            return;
        }
        dispatch(deleteChat({ chatID }));

    }
    return (
        <ChatList
            chats={chats}
            urlChatIconActive={urlChatIconActive}
            urlChatIconNewMessage={urlChatIconNewMessage}
            urlChatIconNotActive={urlChatIconNotActive}
            newChatField={newChatField}
            setNewChatField={setNewChatField}
            sendNewChat={sendNewChat}
            fireChat={fireChat}
            handlerDeleteChat={handlerDeleteChat}
        />
    )
}

export default ChatListContainer;