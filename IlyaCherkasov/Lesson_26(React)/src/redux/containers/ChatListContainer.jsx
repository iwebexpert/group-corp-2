import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

import urlChatIconActive from '../../img/chatIconActive.png';
import urlChatIconNewMessage from '../../img/chatIconNewM.png';
import urlChatIconNotActive from '../../img/chatIconNotActive.png';

import ChatList from '../../components/ChatList/ChatList'
import { chatsPostAction, deleteChat, chatsLoadAction } from '../actions/chatActions';

const ChatListContainer = () => {
    const isLoading = useSelector(state => state.chats.loading);
    const isError = useSelector(state => state.chats.error);
    const chats = useSelector(state => state.chats.entries);

    const dispatch = useDispatch();
    const { id } = useParams();

    const [newChatField, setNewChatField] = useState('');

    const sendNewChat = () => {
        if (newChatField !== '') {
            dispatch(
                chatsPostAction({
                    title: newChatField,
                    messages: [],
                })
            );
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

    const handlerReloadChat = () => {
        dispatch(chatsLoadAction());
    }

    if (isLoading) {
        return <ChatList isLoading={true} />
    }
    if (isError) {
        return <ChatList isError={true} handlerReloadChat={handlerReloadChat} />
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
            isLoading={false}
            isError={false}
        />
    )
}

export default ChatListContainer;