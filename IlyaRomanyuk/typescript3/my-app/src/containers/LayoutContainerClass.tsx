import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { addMessageTC, deleteMessageTC, chatsLoadTC } from '../actions/addChatAC';
import { AppState } from './../reducers';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


export const LayoutContainer: React.FC = () => {
    const dispatch = useDispatch();
    const id = Number.parseInt(useParams<{ id: string }>().id);

    const chats = useSelector((state: AppState) => state.chats.data);
    let messages = Object.values(chats).find(el => el.id == id) ? Object.values(chats).find(el => el.id == id) : null;

    useEffect(() => {
        dispatch(chatsLoadTC())
    }, [])

    const handleMessageSend = (message: Message) => {
        dispatch(addMessageTC(+id, message));
    };

    const deleteMessage = (id: number, messId: string) => {
        dispatch(deleteMessageTC(id, messId))
    }

    const cleanAll = (id: number) => {
        messages!.messages.forEach(async el => {
            await dispatch(deleteMessageTC(id, el.id))
        });
    }

    return <Layout cleanAllMessagesAction={cleanAll}
        deleteMessageAction={deleteMessage}
        chats={messages!}
        handleMessageSend={handleMessageSend} />;
}