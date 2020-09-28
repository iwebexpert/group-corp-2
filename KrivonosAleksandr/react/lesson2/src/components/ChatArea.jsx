import React, {Component} from 'react';

import {TitleArea} from './areas/TitleArea.jsx';
import {InputArea} from './areas/InputArea.jsx';
import {MessagesCheck} from "./areas/messages/MessagesCheck";
import {Scrollbars} from "react-custom-scrollbars";

export class ChatArea extends Component {

    state = {
        answerCount: 0,
        idCount: 0,
        userName:'',
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
        let answer;
        clearInterval(answer);
        this.setState(
            {
                idCount: this.state.idCount + 1,
                messages: this.state.messages.concat([{
                    text: message,
                    time: new Date().toLocaleTimeString(),
                    type: 'myMsg',
                    id: this.state.idCount
                }])
            }
        );
        answer = setTimeout(this.sendAnswer, 1000);
    }

    sendAnswer = () => {
        if(this.state.idCount < this.state.botMessages.length*2) {
            let text;
            let userName = '';
            if (this.state.idCount === 3) {
                userName = this.state.messages[3].text;
                text = userName + this.state.botMessages[this.state.answerCount];
            } else {
                text = this.state.botMessages[this.state.answerCount];
            }
            console.log(userName);
            this.setState(
                {
                    idCount: this.state.idCount + 1,
                    messages: this.state.messages.concat([{
                        text: text,
                        time: new Date().toLocaleTimeString(),
                        type: 'botMsg',
                        id: this.state.idCount
                    }]),
                    answerCount: this.state.answerCount + 1,
                    userName: userName
                }
            );
        }
    }

    render() {
        return (
            <div className="chat">
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