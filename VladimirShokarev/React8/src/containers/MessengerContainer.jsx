import React, { useEffect } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "components/Messenger";
import { chatsLoadAction, chatsMessageSendAction, addChatAction } from "../actions/chats";
import { push } from "connected-react-router";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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

    return <Messenger chats={chats} messages={messages} handleMessageSend={handleMessageSend} handleNewChat={handleNewChat} handleChatsReload={handleChatsReload} isLoading={isLoading} isError={isError} />

};