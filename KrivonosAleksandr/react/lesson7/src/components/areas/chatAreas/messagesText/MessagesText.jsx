import React, {Component} from "react";
import { nanoid } from 'nanoid'
import {TitleArea} from "./TitleArea";
import {Scrollbars} from "react-custom-scrollbars";
import {MessagesCheck} from "./messages/MessagesCheck";
import {InputArea} from "./InputArea";

export class MessagesText extends Component {

    render() {
        const {messages, chat, onSend} = this.props;
        const messagesArr = [];
        if(messages){
            Object.assign(messagesArr, messages);
        }
        return (
            <div className="chat_messages">
                {/********TITLE AREA*******/}
                <TitleArea dialogInfo={chat}/>

                <hr/>

                {/********MESSAGES AREA*******/}
                <div className="messages_area">
                    <Scrollbars style={{width: 553, height: 460}}>
                        <MessagesCheck items={messagesArr}/>
                    </Scrollbars>
                </div>

                <hr/>

                {/********INPUT AREA*******/}
                <InputArea onSend={onSend}/>
                {/*<InputArea onSend={onSend} userName={chat.userName}/>*/}
            </div>
        );
    }
}