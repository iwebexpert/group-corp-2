import React from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction, chatsMessageSendAction, chatsAddFormAction} from '../actions/chats';
import {Messenger} from "../components/Messenger/index";

class MessageContainerClass extends React.Component {

    // componentDidMount() {
    //     this.props.chatsLoadAction();
    // }



    handleMessageSend = (message) => {
        console.log(message)
        const {chatId} = this.props;
        this.props.chatsMessageSendAction({
                ...message,
                chatId,
        })
    }


    render() {
        const {messages} = this.props;
        console.log(this.props)
        return <Messenger messages={messages}
                          handleMessageSend={this.handleMessageSend}
        />;
    }
}

function mapStateProps(state, ownProps) {
    const chats = state.chats.entries;
    const {match} = ownProps;
    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }
    return {
        messages,
        chatId: match ? match.params.id : null
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
    }
}

export const MessageContainer = connect(mapStateProps, mapDispatchToProps)(MessageContainerClass);