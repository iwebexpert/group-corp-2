import React from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { Messenger } from "components/Messenger";
import { chatsLoadAction, chatsMessageSendAction, addChatAction } from "../actions/chats";

class MessengerContainerClass extends React.Component {
    componentDidMount() {
        this.props.chatsLoadAction();
    }

    handleMessageSend = (message) => {
        const { chatId } = this.props;
        message.id = nanoid();
        this.props.chatsMessageSendAction({
            ...message,
            chatId,
        });
    };
    handleNewChat = (chat) => {
        console.log(chat)
        this.props.addChatAction({
            chat
        });
    };

    render() {
        const { messages, chats } = this.props;
        return <Messenger chats={chats} messages={messages} handleMessageSend={this.handleMessageSend} handleNewChat={this.handleNewChat} />
    };
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const { match } = ownProps;
    let messages = null;
    if (match && chats[match.params.id]) {
        messages = chats[match.params.id].messages;
    }
    return {
        messages,
        chatId: match ? match.params.id : null,
        chats,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsMessageSendAction: (message) => dispatch(chatsMessageSendAction(message)),
        addChatAction: (chat) => dispatch(addChatAction(chat)),
    }
}

export const MessengerContainer = connect(mapStateToProps, mapDispatchToProps)(MessengerContainerClass);