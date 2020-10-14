import React, {Component} from "react";
import {connect} from 'react-redux';
import {chatsMessageSendAction} from '../actions/chats';

import {MessagesText} from "../components/areas/chatAreas/messagesText/MessagesText";
import {nanoid} from "nanoid";

class MessagesTextContainerClass extends  Component{

    messagesSet = (message, chats, id, chat, type, text='empty message') =>{
        const chatId = id;
        message.id = nanoid();
        message.type = type;
        message.time = new Date().toLocaleTimeString();

        let numAnswers = chats[chatId].answerCount;

        this.props.chatsMessageSendAction({...message, chatId}, chats, numAnswers);
    }

    handleMessageSend = (message) => {

        const chats = this.props.chats;
        const {id} = this.props;
        const chat = chats[id];

        message = this.messagesSet(message, chats, id, chat, 'myMsg');
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
        chatsMessageSendAction: (message, chats) => dispatch(chatsMessageSendAction(message, chats)),
    }
}

export const MessagesTextContainer = connect(mapStateToProps, mapDispatchToProps)(MessagesTextContainerClass);














