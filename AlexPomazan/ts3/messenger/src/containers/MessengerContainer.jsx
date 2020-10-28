import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from "nanoid";
import { push } from "connected-react-router";
import { useParams } from 'react-router-dom';

import { Messenger } from "../components/Messenger";
import {
    chatsLoadAction,
    chatsMessageSendAction,
    addChatAction,
} from "../actions/chats";

const manImg = "/src/img/man.png";

export const MessengerContainer = (props) => {
    console.log(props);
    const dispatch = useDispatch();
    const { id } = useParams();

    const chats = useSelector((state) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;
    const title = chats[id] ? chats[id].title : null;

    const [isLoading, isError] = useSelector((state) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());
    }, []);

    const handleMessageSend = (message) => {
        dispatch(chatsMessageSendAction({
            ...message,
            id: nanoid(),
            img: manImg,
            chatId: +id,
        }));
    };

    const handleAddChat = (chat) => {
        const lastChatId = Object.keys(chats).length;
        dispatch(addChatAction({
            ...chat, 
            fire: false,
        }));
        dispatch(push(`/chats/${lastChatId}`));
    };

    const handleChatsReload = () => {
        dispatch(chatsLoadAction());
    }

    return <Messenger
        isError={isError}
        isLoading={isLoading}
        messages={messages}
        chats={chats}
        title={title}
        handleMessageSend={handleMessageSend}
        handleAddChat={handleAddChat}
        handleChatsReload={handleChatsReload}
    />;
};