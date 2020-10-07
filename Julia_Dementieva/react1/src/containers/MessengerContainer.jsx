import React from 'react';
import {connect} from 'react-redux';
import { nanoid } from 'nanoid';

import {Messenger} from 'components/Messenger';
import {Error} from '../pages/Error';
import {chatsLoadAction, chatsMessageSendAction} from '../actions/chats';

class MessengerContainerClass extends React.Component {
    
    componentDidMount(){
        console.log('chatsLoadActionjjjjjjjjjjjjjjjjjjjjjjjjjjj')
        this.props.chatsLoadAction();
    }

    handleMessageSend = (message) => {
        const {chatId, chatsMessageSendAction} = this.props;
        console.log('Contai', message)
        chatsMessageSendAction({
            ...message,
            id: nanoid(),
            chatId,
        });
        
    };

    render(){
        const {authorChat, namePerson, avatarChat, messages} = this.props;
        return(messages ? <Messenger {...this.props} messages={messages} authorChat={authorChat}  avatarChat={avatarChat} namePerson={namePerson} onAdd={this.handleMessageSend} /> : <Error />)
    }
}

function mapStateToProps(state, ownProps){
    const chats = state.chats.entries;
    const {match} = ownProps;

    let messages = null;
    let authorChat = null;
    let namePerson = 'Web1';
    let avatarChat = null;

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages;
        authorChat = chats[match.params.id].author;
        avatarChat = chats[match.params.id].avatar;
        // namePerson = chats[match.params.id].avatar;
    }
    
    return {
        messages,
        chatId: match ? match.params.id: null,
        authorChat,
        avatarChat,
        namePerson,
    };
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
    }
}


export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);
