import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Messenger} from '../components/Messenger';
import { nanoid } from 'nanoid';
import {chatLoadActions, chatMessageSendActions, chatAddActions} from '../actions/chats';

class MessengerContainerClass extends Component{
    constructor(props){
        super(props);
        this.onHandleMessageSend = this.onHandleMessageSend.bind(this);
        this.addNewChat = this.addNewChat.bind(this);
    }

    componentDidMount(){
        this.props.chatLoadActions();
    }

    onHandleMessageSend(newMessage, newAuthor){
        const {chatId} = this.props;
        this.props.chatMessageSendActions({text: newMessage, author: newAuthor, id: nanoid(), chatId});

    }

    addNewChat(chat){
        this.props.chatAddActions({chat});
    }

    render(){
        const {messages, title, allChats} = this.props;
        return (
            <Messenger messages={messages}
                        title={title}
                        chats={allChats}
                        onHandleMessageSend={this.onHandleMessageSend}
                        addNewChat={this.addNewChat}/>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chatLoadActions: () => dispatch(chatLoadActions()),
        chatMessageSendActions: (message) => dispatch(chatMessageSendActions(message)),
        chatAddActions: (chat) => dispatch(chatAddActions(chat)),
    }
}

const mapStateToProps = (state, ownProps) =>{
    const chats = state.chats.entries; 
    const {match} = ownProps;
    let messages = null;
    let chatsTitle = null;

    if(match && chats[+match.params.id]){
        messages = chats[+match.params.id].messages;
        chatsTitle = chats[+match.params.id].title;
    }

    return {
        messages,
        chatId: match ? match.params.id : null,
        title: chatsTitle,
        allChats: chats,
    };
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);