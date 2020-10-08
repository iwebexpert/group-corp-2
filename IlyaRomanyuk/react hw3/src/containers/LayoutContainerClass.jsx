import React from 'react';
import { connect } from 'react-redux';
import { Layout } from '../components/Layout';
import { loadChatsAC, addMessageAC } from '../actions/addChatAC';

class LayoutContainerClass extends React.Component {
    componentDidMount = () => {
        this.props.chatsLoadAction();
    }

    handleMessageSend = (message) => {
        const { chatId } = this.props;
        this.props.addMessageAction({ ...message, chatId });
    };

    render() {
        return <Layout chats={this.props.messages} handleMessageSend={this.handleMessageSend} />;
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
        messages,
        chatId: match ? match.params.id : null,
    };
}

const mapDispatchToProps = (dispatch) => ({
    chatsLoadAction: () => dispatch(loadChatsAC()),
    addMessageAction: (message) => dispatch(addMessageAC(message))
})

export const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(LayoutContainerClass);