import React from 'react';
import {connect} from 'react-redux';
import { nanoid } from 'nanoid';

import {Messenger} from 'components/Messenger';
import {Error} from '../pages/Error';
import {chatsLoadAction, chatsMessageSendAction} from '../actions/chats';
import {aboutLoadAction} from '../actions/about';
import {robotLoadAction} from '../actions/robot';

class MessengerContainerClass extends React.Component {
    
    componentDidMount(){
        this.props.chatsLoadAction();
        this.props.aboutLoadAction();
        this.props.robotLoadAction();
    }

    handleMessageSend = (message) => {
        const {chatId, chatsMessageSendAction} = this.props;
        chatsMessageSendAction({
            ...message,
            id: nanoid(),
            chatId,
        });
    };

    render(){
        const {messages, namePerson, nameRobot} = this.props;
        return((messages && namePerson && nameRobot) ? <Messenger {...this.props}  onAdd={this.handleMessageSend} /> : <Error />)
    }
}

function mapStateToProps(state, ownProps){
    const chats = state.chats.entries;
    const {match} = ownProps;
    const {loading, entries} = state.about;

    let messages, authorChat = null;
    let namePerson, avatarChat = null;
    let nameRobot, answerRobot = null;

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages;
        authorChat = chats[match.params.id].author;
        avatarChat = chats[match.params.id].avatar;
    }

    if(loading){
        namePerson = entries.name;
    }

    if(state.robot.loading){
        nameRobot = state.robot.entries.nameRobot;
        answerRobot = state.robot.entries.answerRobot;
    }
    
    return {
        messages,
        chatId: match ? match.params.id: null,
        authorChat,
        avatarChat,
        namePerson,
        nameRobot,
        answerRobot,
    };
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        aboutLoadAction: () => dispatch(aboutLoadAction()),
        robotLoadAction: () => dispatch(robotLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
    }
}


export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);
