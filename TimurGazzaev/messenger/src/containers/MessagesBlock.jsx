import React from 'react'
import {connect} from 'react-redux'
import { nanoid } from 'nanoid'

import {MessagesBlock} from 'components/MessagesBlock/MessagesBlock';
import {chatsLoadAction, chatsMessageSendAction} from '../actions/chats';

class MessagesBlockContainer extends React.Component {
    componentDidMount(){c
        this.props.chatsLoadAction();
    }

    handleMessageSend = (message) => {
        const {chatId} = this.props;
        message.id = nanoid();
        this.props.chatsMessageSendAction({
            ...message,
            chatId,
        });

    };

    render(){
        console.log('MessengerContainerClass', this.props);
        const {messages} = this.props;
        return <Messenger messages={messages} handleMessageSend={this.handleMessageSend} />;
    }
}

function mapStateToProps(state, ownProps){
    const chats = state.chats.entries;
    const {match} = ownProps;

    let messages = null;

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages;
    }

    return {
        messages,
        chatId: match ? match.params.id: null,
    };
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesBlockContainer)
