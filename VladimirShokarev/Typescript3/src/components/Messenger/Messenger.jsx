import React, { Component } from "react";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import { ChatForm } from "../ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { ChatList } from "../ChatList";
import { HeaderContainer } from "../../containers/HeaderContainer";
import "./Messenger.css";

export const Messenger = (props) => {
    const { messages, handleMessageSend, handleNewChat, chats, isLoading, isError, handleChatsReload } = props;
    const chatList = Array.from(chats);

    if (isError) {
        return (<div>Error... <button onClick={handleChatsReload}>Обновить чаты</button></div>);
    }
    if (isLoading) {
        return (<div>Loading...</div>);
    }

    return (<>
        <HeaderContainer />
        <div className="main">
            <div className="chats-container">
                <div className="chats">
                    {chatList ? <ChatList items={chatList} /> : <div>ChatList</div>}
                </div>
                <div className="new-chat">
                    <ChatForm
                        onSend={handleNewChat}
                    />
                </div>
            </div>
            <div className="messanger">
                <div className="messages-list"> {messages ? <MessagesList items={messages} /> : <div className="empty-chat">Выберите чат слева
                </div>
                }</div>

                {messages && <MessageForm onSend={handleMessageSend} />}
            </div>
        </div>
    </>
    );
};