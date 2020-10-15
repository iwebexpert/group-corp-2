import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../components/Layout';
import { addMessageTC, cleanAllMessagesAC, deleteMessageTC, chatsLoadTC } from '../actions/addChatAC';

class LayoutContainerClass extends React.Component {
    componentDidMount = () => {
        this.props.chatsLoadAction();
    }

    handleMessageSend = async (message) => {
        const { chatId, addMessageAction } = this.props;
        addMessageAction(chatId, message)
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
    chatsLoadAction: () => dispatch(chatsLoadTC()),
    addMessageAction: (chatId, message) => dispatch(addMessageTC(chatId, message)),
    cleanAllMessagesAction: (chatId) => dispatch(cleanAllMessagesAC(chatId)),
    deleteMessageAction: (chatId, messageId) => dispatch(deleteMessageTC(chatId, messageId))
})

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(LayoutContainerClass);