import React, { Component } from "react";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import { Footer } from "../Footer";
import { ChatForm } from "../ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { ChatList } from "../ChatList";
import { HeaderContainer } from "../../containers/HeaderContainer";
import "./Messenger.css";
export class Messenger extends Component {
    render() {
        const { messages, handleMessageSend, handleNewChat, chats, profile, handleDeleteChat, handleDeleteMessage } = this.props;
        const chatList = Array.from(chats);
        return (<>
            <HeaderContainer />
            <div className="main">
                <div className="chats-container">
                    <div className="chats">
                        {chatList ? <ChatList handleDeleteChat={handleDeleteChat} items={chatList} /> : <div>ChatList</div>}
                    </div>
                    <div className="new-chat">
                        <ChatForm
                            onSend={handleNewChat}
                        />
                    </div>
                </div>
                <div className="messanger">
                    <div className="messages-list"> {messages ? <MessagesList handleDeleteMessage={handleDeleteMessage} items={messages} /> : <div className="empty-chat">Выберите чат слева
                    <SubdirectoryArrowLeftIcon className="arrow-to-chat" />
                    </div>
                    }</div>
                    {messages && <MessageForm onSend={handleMessageSend} />}
                </div>
            </div>
            <Footer />
        </>
        );
    }
}