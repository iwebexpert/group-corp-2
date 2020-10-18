import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Messenger } from "components/Messenger";
import { chatsLoadAction, chatsMessageSendAction, addChatAction, deleteChatAction, deleteMessageAction } from "../actions/chats";
import { push } from "connected-react-router";
import { nanoid } from "nanoid";


export const MessengerContainer = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const chats = useSelector((state) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;

    const [isLoading, isError] = useSelector((state) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());

    }, []);

    const handleMessageSend = (message) => {
        message.id = nanoid();
        dispatch(chatsMessageSendAction({
            ...message,
            chatId: +id
        }));
        dispatch(chatsLoadAction());
    };

    const handleNewChat = (chat) => {
        const lastChatId = Object.keys(chats).length;
        dispatch(addChatAction(chat));
        dispatch(push(`/chats/${lastChatId}`));
    };

    const handleChatsReload = () => {
        dispatch(chatsLoadAction());
    }

    const handleDeleteChat = (id) => {
        dispatch(deleteChatAction(
            id
        ));
        dispatch(push(`/chats/123`));
        dispatch(chatsLoadAction());
    };

    const handleDeleteMessage = (id) => {
        dispatch(deleteMessageAction(id));
        dispatch(chatsLoadAction());
    };

    return <Messenger chats={chats} messages={messages} handleDeleteChat={handleDeleteChat} handleMessageSend={handleMessageSend} handleNewChat={handleNewChat} handleDeleteMessage={handleDeleteMessage} handleChatsReload={handleChatsReload} isLoading={isLoading} isError={isError} />

};
