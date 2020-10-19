import React from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { push } from 'connected-react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ContentSend from '@material-ui/icons/Send';
import PropTypes from "prop-types";
import { addChat } from '../actions/chatActions';


class ChatList extends React.Component {
    static propTypes = {
        chats: PropTypes.object.isRequired,
        chatsWithNewMessages: PropTypes.arrayOf(PropTypes.number).isRequired,
        addChat: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
    };

    state = {
        input: '',
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.handleAddChat();
        }
    };

    handleAddChat = () => {
        if (this.state.input.length > 0) {
            this.props.addChat(this.state.input);
            this.setState({ input: '' });
        }
    };

    handleNavigate = (location) => {
        this.props.push(location);
    };

    render() {
        const { chats, chatsWithNewMessages } = this.props;
        const chatElements = Object.keys(chats).map(chatId => (
            <ListItem
                // className={ chatsWithNewMessages.indexOf(Number(chatId)) >= 0 ? 'highlighted' : '' }
                style={chatsWithNewMessages.indexOf(Number(chatId)) >= 0 ? { backgroundColor: 'red' } : {}}
                primaryText={chats[chatId].title}
                leftIcon={<ContentSend />}
                onClick={() => this.handleNavigate(`/chat/${chatId}`)}
            />)
        );

        return (
            <List>
                { chatElements}
                <ListItem
                    key="Add new chat"
                    leftIcon={<AddIcon />}
                    onClick={this.handleAddChat}
                    style={{ height: '60px' }}
                    children={<TextField
                        key="textField"
                        fullWidth
                        name="input"
                        hintText="Добавить новый чат"
                        onChange={this.handleChange}
                        value={this.state.input}
                        onKeyUp={this.handleKeyUp}
                    />}
                />
            </List>
        )
    }
}


const mapStateToProps = ({ chatReducer }) => ({
    chats: chatReducer.chats,
    chatsWithNewMessages: chatReducer.chatsWithNewMessages,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
