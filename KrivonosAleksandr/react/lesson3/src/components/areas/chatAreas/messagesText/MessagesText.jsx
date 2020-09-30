import React, {Component} from "react";
import { nanoid } from 'nanoid'
import {TitleArea} from "./TitleArea";
import {Scrollbars} from "react-custom-scrollbars";
import {MessagesCheck} from "./messages/MessagesCheck";
import {InputArea} from "./InputArea";

export class MessagesText extends Component {

    answerDelay = null;

    state = {
        answerCount: 0,
        userName: '',
        botMessages: [`Как тебя зовут?`, `, приятно познакомиться)\nСколько тебе лет?`, `А какой у тебя опыт в программировании?)`, `Вау, это очень круто!\nПриятно было пообщаться!)`],
        messages: [
            {
                text: `Привет!\n Давай немного пообщаемся с тобой)`,
                type: 'botMsg',
                time: `It's first message`,
                id: 0
            }
        ]
    }

    handleMessageSend = (message) => {
        clearInterval(this.answerDelay);
        this.setState(
            {
                messages: this.state.messages.concat([{
                    text: message,
                    time: new Date().toLocaleTimeString(),
                    type: 'myMsg',
                    id: nanoid()
                }])
            }
        );
        this.answerDelay = setTimeout(this.sendAnswer, 3000);
    }

    sendAnswer = () => {
        if (this.state.answerCount < this.state.botMessages.length) {
            let text;
            let userName = '';
            if (this.state.answerCount === 1) {
                userName = this.state.messages[this.state.messages.length - 1].text;
                text = userName + this.state.botMessages[this.state.answerCount];
            } else {
                text = this.state.botMessages[this.state.answerCount];
            }
            this.setState(
                {
                    messages: this.state.messages.concat([{
                        text: text,
                        time: new Date().toLocaleTimeString(),
                        type: 'botMsg',
                        id: nanoid()
                    }]),
                    answerCount: this.state.answerCount + 1,
                    userName: userName
                }
            );
        }
    }

    render() {
        return (
            <div className="chat_messages">
                {/********TITLE AREA*******/}
                <TitleArea/>

                <hr/>

                {/********MESSAGES AREA*******/}
                <div className="messages_area">
                    <Scrollbars style={{width: 553, height: 460}}>
                        <MessagesCheck items={this.state.messages}/>
                    </Scrollbars>
                </div>

                <hr/>

                {/********INPUT AREA*******/}
                <InputArea onSend={this.handleMessageSend} userName={this.state.userName}/>
            </div>
        );
    }
}