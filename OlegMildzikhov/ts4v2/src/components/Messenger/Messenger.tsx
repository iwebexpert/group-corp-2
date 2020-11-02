import React, {Component} from 'react';
import {MessagesList} from '../MessagesList';
import {MessageForm} from '../MessageForm';

import './Messenger.css';

export type MessengerProps = {
    messages: MesageType[];
    handleMessageSend: (message: MesageType) => void;
    handleChatAdd: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleChatsReload: () => void;
    isLoading: boolean;
    isError: boolean;
};

export class Messenger extends Component<MessengerProps> {
    render(){
        const {messages, handleMessageSend, handleChatAdd, handleChatsReload, isLoading, isError} = this.props;

        if(isError){
            return (<div>Error... <button onClick={handleChatsReload}>Обновить чаты</button></div>);
        }

        if(isLoading){
            return (<div>Loading...</div>);
        }

        return (
            <div className="messenger">
                <div className="messenger__messages-list">
                    {messages ? <MessagesList items={messages} /> : <div>Выберите чат</div>}
                </div>
                <div className="messenger__message-sender">
                    {messages && <MessageForm onSend={handleMessageSend} />}
                </div>

                <button onClick={handleChatAdd}>Добавить новый чат</button>
            </div>
        );
    }
}