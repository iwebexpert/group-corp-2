import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {chatsMessageSendAction} from '../actions/chats';

import {MessagesText} from "../components/areas/chatAreas/messagesText/MessagesText";
import {nanoid} from "nanoid";
import {AppState} from "../reducers";

export const MessagesTextContainer: React.FC<any> = (props) => {

    const dispatch = useDispatch();
    const chats = useSelector((state: AppState) => state.chats.entries);

    const {id} = props;
    const chat: chatsPayload = chats[id];
    const messages: messagePayload[] | undefined = chat ? chat.messages : [];

    const messagesSet = (message: string, chats: chatsPayload[], id: number, chat: chatsPayload, type: string, text : string= 'empty message'): void => {
        const chatId = id;
        let msg: messagePayload = {
            id: nanoid(),
            type: type,
            time: new Date().toLocaleTimeString(),
            text: message,
            chatId: chatId
        }

        let numAnswers: number = chats[chatId].answerCount;

        dispatch(chatsMessageSendAction({...msg}, chats, numAnswers));
    }

    const handleMessageSend = (message: string): void => {
        messagesSet(message, chats, id, chat, 'myMsg');
    }

    return <MessagesText chat={chat} messages={messages} onSend={handleMessageSend}/>;
}














