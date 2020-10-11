import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../components/Layout';
import { loadChatsAC, addMessageAC, cleanAllMessagesAC, deleteMessageAC } from '../actions/addChatAC';

class LayoutContainerClass extends React.Component {
    componentDidMount = () => {
        if (!Object.values(this.props.chats).length) {
            this.props.chatsLoadAction();
        }
    }

    handleMessageSend = (message) => {
        const { chatId, addMessageAction } = this.props;
        addMessageAction({ ...message, chatId });
    };

    render() {
        const { messages, cleanAllMessagesAction, deleteMessageAction } = this.props;
        return <Layout cleanAllMessagesAction={cleanAllMessagesAction}
            deleteMessageAction={deleteMessageAction}
            toggleIsFetching={this.toggleIsFetching}
            chats={messages}
            handleMessageSend={this.handleMessageSend} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    const chats = state.chats.data;
    const { match } = ownProps;

    let messages = null;

    if (match && chats[match.params.id]) {
        messages = chats[match.params.id];
    }

    return {
        chats,
        messages,
        chatId: match ? match.params.id : null
    };
}

const mapDispatchToProps = (dispatch) => ({
    chatsLoadAction: () => dispatch(loadChatsAC()),
    addMessageAction: (message) => dispatch(addMessageAC(message)),
    cleanAllMessagesAction: (chatId) => dispatch(cleanAllMessagesAC(chatId)),
    deleteMessageAction: (chatId, messageId) => dispatch(deleteMessageAC(chatId, messageId))
})

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(LayoutContainerClass);