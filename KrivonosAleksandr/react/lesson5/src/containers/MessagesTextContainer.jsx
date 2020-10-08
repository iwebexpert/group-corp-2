import React, {Component} from "react";
import {connect} from 'react-redux';
import {chatsMessageSendAction} from '../actions/chats';

import {MessagesText} from "../components/areas/chatAreas/messagesText/MessagesText";
import {nanoid} from "nanoid";

class MessagesTextContainerClass extends  Component{

    answerDelay = null;

    messagesSet = (message, chats, id, chat, type, userName = 'User', text='empty message') =>{
        const chatId = id;
        message.id = nanoid();
        message.type = type;
        message.time = new Date().toLocaleTimeString();
        if(type === 'botMsg'){
            chat.answerCount = chat.answerCount + 1;
            chat.userName = userName;
            message.text = text;
        }

        this.props.chatsMessageSendAction({
            ...message,
            chatId
        });
    }

    handleMessageSend = (message) => {
        clearInterval(this.answerDelay);

        const chats = this.props.chats;
        const {id} = this.props;
        const chat = chats[id];

        message = this.messagesSet(message, chats, id, chat, 'myMsg');

        if(chat.botMessages !== undefined) {
            this.answerDelay = setTimeout(this.sendAnswer, 1000);
        }
    }

    sendAnswer = () => {
        const chats = this.props.chats;
        const {id} = this.props;
        const chat = chats[id];

        if (chat.answerCount < chat.botMessages.length) {
            let text;
            let userName = '';
            if (chat.answerCount === 1) {
                userName = chat.messages[chat.messages.length - 1].text;
                text = userName + chat.botMessages[chat.answerCount];
            } else {
                text = chat.botMessages[chat.answerCount];
            }

            let message = {};

            message = this.messagesSet(message, chats, id, chat, 'botMsg', userName, text);
        }
    }

    render(){
        const chats = this.props.chats;
        const messages = this.props.messages;
        const {id} = this.props;
        const chat = chats[id];
        return <MessagesText chat={chat} messages={messages} onSend={this.handleMessageSend}/>;
    }
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const {id} = ownProps;
    let messages = null;

    if(chats[id]){
        messages = chats[id].messages;
    }
    return {
        chats,
        id,
        messages
    }
}

function mapDispatchToProps(dispatch){
    return {
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
    }
}

export const MessagesTextContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesTextContainerClass);














