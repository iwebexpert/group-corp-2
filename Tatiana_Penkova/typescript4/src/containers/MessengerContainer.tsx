import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Messenger } from "../components/Messenger";
import { chatsLoadAction, addChatAction, deleteChatAction } from "../actions/chats";
import { chatsMessageSendAction, deleteMessageAction, chatsMessageLoadAction } from "../actions/messages";
import { push } from "connected-react-router";
import { nanoid } from "nanoid";
import { NewChatType, MessagesType, DefaultChatsRootState, ParamTypes } from "../types";

export const MessengerContainer: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const { id } = useParams<ParamTypes>();
    const chats = useSelector((state: DefaultChatsRootState) => state.chats.entries);
    const messages = chats[+id] ? chats[+id].messages : null;
    const [isLoading, isError] = useSelector((state: DefaultChatsRootState) => [state.chats.loading, state.chats.error]);

    useEffect((): void => {
        dispatch(chatsLoadAction());
        dispatch(chatsMessageLoadAction());
    }, [dispatch]);

    const handleMessageSend = (message: MessagesType): void => {
        message.id = nanoid();
        dispatch(chatsMessageSendAction({
            ...message,
            chatId: +id
        }));
        dispatch(chatsLoadAction());
    };

    const handleNewChat = (chat: NewChatType): void => {
        const lastChatId: number = Object.keys(chats).length;
        dispatch(addChatAction(chat));
        dispatch(chatsLoadAction());
        dispatch(push(`/chats/${lastChatId}`));
    };

    const handleChatsReload = (): void => {
        dispatch(chatsLoadAction());
    };

    const handleDeleteChat = (id: number): void => {
        dispatch(deleteChatAction(
            id
        ));
        dispatch(push(`/chats/123`));
        dispatch(chatsLoadAction());
    };

    const handleDeleteMessage = (id: string): void => {
        dispatch(deleteMessageAction(id));
        dispatch(chatsLoadAction());
    };

    return <Messenger chats={chats} messages={messages} handleDeleteChat={handleDeleteChat} handleMessageSend={handleMessageSend} handleNewChat={handleNewChat} handleDeleteMessage={handleDeleteMessage} handleChatsReload={handleChatsReload} isLoading={isLoading} isError={isError} />

};
