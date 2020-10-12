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

    handleNewChat = (chat) => {
        const { redirect, lastChatId } = this.props;
        this.props.addChatAction({
            chat
        });
        redirect(lastChatId);
    };

    handleDeleteChat = (chat) => {
        const { redirect, location } = this.props;
        const listId = chat.target.closest("div");
        const navLink = listId.closest("li").querySelector("a");
        const str = navLink.toString();
        const newString = /\d+$/.exec(str);
        const currentId = Number(newString[0]);
        this.props.deleteChatAction({
            currentId,
        })
        redirect(123);
    }

    handleDeleteMessage = (id) => {
        const { chatId } = this.props;
        const thisMessage = id.target.closest("div");
        const allMessages = document.querySelectorAll(".message");
        for (let i = 0; i < allMessages.length; i++) {
            if (allMessages[i] === thisMessage) {
                const messageIndex = i;
                this.props.deleteMessageAction({
                    chatId,
                    messageIndex
                })
            }
        }
    };

    render() {
        const { messages, chats } = this.props;
        return <Messenger chats={chats} messages={messages} handleDeleteChat={this.handleDeleteChat} handleMessageSend={this.handleMessageSend} handleNewChat={this.handleNewChat} handleDeleteMessage={this.handleDeleteMessage} />
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
        addChatAction: (chat) => dispatch(addChatAction(chat)),
        deleteChatAction: (currentId) => dispatch(deleteChatAction(currentId)),
        deleteMessageAction: (message) => dispatch(deleteMessageAction(message)),
        redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);