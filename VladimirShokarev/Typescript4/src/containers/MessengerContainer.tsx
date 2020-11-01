import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { Messenger } from "../components/Messenger";
import { chatsLoadAction, chatsMessageSendAction, addChatAction } from "../actions/chats";
import { push } from "connected-react-router";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {AppState} from '../reducers';

export const MessengerContainer: React.FC = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams<{id: string}>();
    const chats = useSelector((state: AppState) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;

    const [isLoading, isError] = useSelector((state: AppState) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());

    }, []);

    const handleMessageSend = (message: MessageType) => {
        message.id = nanoid();
        dispatch(chatsMessageSendAction({
            ...message,
            chatId: +id
        }));
        dispatch(chatsLoadAction());
    };

    const handleNewChat = (chat: NewChatType) => {
        const lastChatId = Object.keys(chats).length;
        dispatch(addChatAction(chat));
        dispatch(push(`/chats/${lastChatId}`));
    };

    const handleChatsReload = () => {
        dispatch(chatsLoadAction());
    };

    return <Messenger chats={chats} messages={messages} handleMessageSend={handleMessageSend} handleNewChat={handleNewChat} handleChatsReload={handleChatsReload} isLoading={isLoading} isError={isError} />

};