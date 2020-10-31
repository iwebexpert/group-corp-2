import React, {Component} from "react";

import {TitleArea} from "./TitleArea";
import {Scrollbars} from "react-custom-scrollbars";
import {MessagesCheck} from "./messages/MessagesCheck";
import {InputArea} from "./InputArea";

type messagesTextType = {
    messages: messagePayload[] | undefined;
    chat: chatsPayload;
    onSend: (message: string) => void
}

export const MessagesText: React.FC<messagesTextType> = (props) => {

    const {messages, chat, onSend} = props;
    const messagesArr: messagePayload[] = [];
    if (messages) {
        Object.assign(messagesArr, messages);
    }
    return (
        <div className="chat_messages">
            {/********TITLE AREA*******/}
            <TitleArea dialogInfo={chat.userName}/>

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
        </div>
    );
}