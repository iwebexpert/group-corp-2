import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {chatsMessageSendAction} from '../actions/chats';

import {MessagesText} from "../components/areas/chatAreas/messagesText/MessagesText";
import {nanoid} from "nanoid";

export const MessagesTextContainer = (props) => {

    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats.entries);

    const {id} = props;
    const chat = chats[id];
    const messages = chat ? chat.messages : [];

    const messagesSet = (message, chats, id, chat, type, text = 'empty message') => {
        const chatId = id;
        message.id = nanoid();
        message.type = type;
        message.time = new Date().toLocaleTimeString();

        let numAnswers = chats[chatId].answerCount;

        dispatch(chatsMessageSendAction({...message, chatId}, chats, numAnswers));
    }

    const handleMessageSend = (message) => {
        message = messagesSet(message, chats, id, chat, 'myMsg');
    }

    return <MessagesText chat={chat} messages={messages} onSend={handleMessageSend}/>;
}














