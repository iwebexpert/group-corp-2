import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { addMessageTC, deleteMessageTC, chatsLoadTC } from '../actions/addChatAC';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


export const LayoutContainer = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const chats = useSelector((state) => state.chats.data);
    const messages = Object.values(chats).find(el => el.id == id) ? Object.values(chats).find(el => el.id == id) : null;

    useEffect(() => {
        dispatch(chatsLoadTC())
    }, [])

    const handleMessageSend = (message) => {
        dispatch(addMessageTC(+id, message));
    };

    const deleteMessage = (id, messId) => {
        dispatch(deleteMessageTC(id, messId))
    }

    const cleanAll = (id) => {
        messages.messages.forEach(async el => {
            await dispatch(deleteMessageTC(id, el.id))
        });
    }

    return <Layout cleanAllMessagesAction={cleanAll}
        deleteMessageAction={deleteMessage}
        chats={messages}
        handleMessageSend={handleMessageSend} />;
}