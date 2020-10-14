import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "components/Messenger";
import { chatsLoadAction, chatsMessageSendAction, addChatAction, deleteChatAction, deleteMessageAction } from "../actions/chats";
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

    handleNewChat = (chats) => {
        const { redirect, lastChatId } = this.props;
        this.props.addChatAction({
            ...chats
        });
        redirect(lastChatId);
    };

    handleDeleteChat = (id) => {
        const { redirect } = this.props;
        this.props.deleteChatAction(
            id
        );
        redirect(123);
        this.props.chatsLoadAction();
    }

    handleDeleteMessage = (id) => {
        this.props.deleteMessageAction(id);
        this.props.chatsLoadAction();
    };

    handleChatsReload = () => {
        this.props.chatsLoadAction();
    }

    render() {
        const { messages, chats, isLoading, isError } = this.props;

        return <Messenger chats={chats} messages={messages} handleDeleteChat={this.handleDeleteChat} handleMessageSend={this.handleMessageSend} handleNewChat={this.handleNewChat} handleDeleteMessage={this.handleDeleteMessage} handleChatsReload={this.handleChatsReload} isLoading={isLoading} isError={isError} />
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
        chatId: Number(match ? match.params.id : null),
        chats,
        lastChatId: Object.keys(chats).length,
        location: location.pathname,
        isLoading: state.chats.loading,
        isError: state.chats.error,
        stateId: state.chats,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
        addChatAction: (chat) => dispatch(addChatAction(chat)),
        deleteChatAction: (currentId) => dispatch(deleteChatAction(currentId)),
        deleteMessageAction: (id) => dispatch(deleteMessageAction(id)),
        redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);