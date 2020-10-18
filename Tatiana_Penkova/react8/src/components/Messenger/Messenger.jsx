import React from "react";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { Footer } from "../Footer";
import { ChatForm } from "../ChatForm";
import { MessagesList } from "../MessagesList";
import { MessageForm } from "../MessageForm";
import { ChatList } from "../ChatList";
import { HeaderContainer } from "../../containers/HeaderContainer";
import { ChatsLoading } from "../ChatsLoading";
import "./Messenger.css";

export const Messenger = (props) => {
    const { messages, handleMessageSend, handleNewChat, chats, handleDeleteChat, handleDeleteMessage, isLoading, isError, handleChatsReload } = props;
    const chatList = Array.from(chats);

    if (isError) {
        return (<>
            <HeaderContainer />
            <div className="error-wrapper">
                <div className="loading-error">
                    <CloudOffIcon className="error-icon" />
                    Ошибка загрузки :(
                <button onClick={handleChatsReload}>Обновить чаты</button>
                </div>
            </div>
            <Footer />
        </>);
    }
    if (isLoading) {
        return (<ChatsLoading />);
    }

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
    )
};