import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import CircularProgress from 'material-ui/CircularProgress';
import Message from './Message';
import { sendMessage } from '../actions/messageActions';
import { loadChats } from '../actions/chatActions';
import '../styles/styles.css';


class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        messages: PropTypes.object.isRequired,
        chats: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        loadChats: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    state = {
        input: '',
    };

    componentDidMount() {
        this.props.loadChats();
        // fetch('/api/messages.json')
        //     .then(response => response.json())
        //     .then(json_data => json_data.forEach(msg => {
        //       this.props.sendMessage(msg.id, msg.text, msg.sender, msg.chatId);
        //     }));
    }

    sendMessage = (message, sender) => {
       const { chatId, messages } = this.props;
       const messageId = Object.keys(messages).length + 1;
       this.props.sendMessage(messageId, message, sender, chatId);
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event, message) => {
        if (event.keyCode === 13) { // Enter
            this.handleSendMessage(message, 'me')
        }
    };

    handleSendMessage = (message, sender) => {
       if (message.length > 0 || sender === 'bot') {
           this.sendMessage(message, sender);
       }
       if (sender === 'me') {
           this.setState({ input: '' })
       }
    };

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />
        }

        const { chatId, chats, messages } = this.props;

        const messageElements = chats[chatId].messageList.map(messageId => (
            <Message
                key={ messageId }
                text={ messages[messageId].text }
                sender={ messages[messageId].sender }
            />
        ));

        return [
            <div key='message-field' className="message-field">
                { messageElements }
            </div>,
            <div key='text-field' style={ { width: '100%', display: 'flex' } }>
                <TextField
                    name="input"
                    fullWidth={ true }
                    hintText="Введите сообщение"
                    style={ { fontSize: '22px' } }
                    onChange={ this.handleChange }
                    value={ this.state.input }
                    onKeyUp={ (event) => this.handleKeyUp(event, this.state.input) }
                />
                <FloatingActionButton onClick={ () => this.handleSendMessage(this.state.input, 'me') }>
                    <SendIcon />
                </FloatingActionButton>
            </div>
        ]
    }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    chats: chatReducer.chats,
    isLoading: chatReducer.isLoading,
    messages: messageReducer.messages,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, loadChats }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);
