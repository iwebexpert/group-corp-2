import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "components/Messenger";
import { chatsLoadAction, chatsMessageSendAction, addChatAction } from "../actions/chats";
import { push } from "connected-react-router";

class MessengerContainerClass extends React.Component {
    componentDidMount() {
        if (!this.props.chats.length) {
            this.props.chatsLoadAction();
        }
    };

    handleMessageSend = (message) => {
        const { chatId } = this.props;
        message.id = nanoid();
        this.props.chatsMessageSendAction({
            ...message,
            chatId,
        });
    };

    handleNewChat = (chat) => {
        const { redirect, lastChatId } = this.props;
        this.props.addChatAction({
            ...chat
        });
        redirect(lastChatId);
    };

    handleChatsReload = () => {
        this.props.chatsLoadAction();
    }

    render() {
        const { messages, chats, isLoading, isError } = this.props;
        return <Messenger isError={isError} isLoading={isLoading}  chats={chats} 
        messages={messages} 
        handleMessageSend={this.handleMessageSend} 
        handleNewChat={this.handleNewChat} 
        handleChatsReload={this.handleChatsReload}/>
    };
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const { match } = ownProps;
    const { location } = state.router;
    let messages = null;
    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }
    return {
        messages,
        chatId: match ? match.params.id : null,
        chats,
        lastChatId: Object.keys(chats).length,
        location: location.pathname,
        isLoading: state.chats.loading,
        isError: state.chats.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
        addChatAction: (chat) => dispatch(addChatAction(chat)),
        redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);