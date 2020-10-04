import React, {Component} from "react";
import { nanoid } from 'nanoid'
import {TitleArea} from "./TitleArea";
import {Scrollbars} from "react-custom-scrollbars";
import {MessagesCheck} from "./messages/MessagesCheck";
import {InputArea} from "./InputArea";

export class MessagesText extends Component {

    answerDelay = null;

    state = {
        chats: this.props.chats
    }

    get messagesGet(){
        const {chats} = this.state;
        const {id} = this.props;

        let messages = null;

        if(chats[id]){
            messages = chats[id].messages;
        }

        return messages;
    }

    messagesSet(message, chats, id, chat, type, userName = 'User', text='empty message'){
        message.id = nanoid();
        message.type = type;
        message.time = new Date().toLocaleTimeString();
        if(type === 'botMsg'){
            chat.answerCount = chat.answerCount + 1;
            chat.userName = userName;
            message.text = text;
        }

        chats[id].messages = chat.messages.concat([message]);

        this.setState(
            {
                chats,
            }
        );
    }

    handleMessageSend = (message) => {
        clearInterval(this.answerDelay);

        const {chats} = this.state;
        const {id} = this.props;
        const chat = chats[id];

        message = this.messagesSet(message, chats, id, chat, 'myMsg');

        this.answerDelay = setTimeout(this.sendAnswer, 1000);
    }

    sendAnswer = () => {
        const {chats} = this.state;
        const {id} = this.props;
        const chat = chats[id];

        if (chat.answerCount < chat.botMessages.length) {
            let text;
            let userName = '';
            if (chat.answerCount === 1) {
                userName = chat.messages[chat.messages.length - 1].text;
                text = userName + chat.botMessages[chat.answerCount];
            } else {
                text = chat.botMessages[chat.answerCount];
            }

            let message = {};

            message = this.messagesSet(message, chats, id, chat, 'botMsg', userName, text);
        }
    }

    render() {
        const messages = this.messagesGet;
        const chat = this.state.chats[this.props.id];

        return (
            <div className="chat_messages">
                {/********TITLE AREA*******/}
                <TitleArea dialogInfo={chat}/>

                <hr/>

                {/********MESSAGES AREA*******/}
                <div className="messages_area">
                    <Scrollbars style={{width: 553, height: 460}}>
                        <MessagesCheck items={messages}/>
                    </Scrollbars>
                </div>

                <hr/>

                {/********INPUT AREA*******/}
                <InputArea onSend={this.handleMessageSend} userName={this.state.chats.userName}/>
            </div>
        );
    }
}