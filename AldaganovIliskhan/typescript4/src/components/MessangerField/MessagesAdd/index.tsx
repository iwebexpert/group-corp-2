import React from 'react'

import { MessagesList } from '../MessagesList';
import './MessagesAdd.scss'
import { MessangerForm } from '../MessangerForm';
import { useSelector } from 'react-redux';
import { MessagesType ,ChatsType} from '../../../actions/chats';
import { AppState } from '../../../reducers';
type MessagesAdd = {
    messages : MessagesType[],
    activeChat : any,
}
export const MessagesAdd : React.FC<MessagesAdd> = ({ messages, activeChat }) => {
    const { pathname } = useSelector((state : AppState) => state.router.location);
    return (
        <div className="messages__add">
            <MessagesList messages={messages} />
            {
                pathname !== '/' && < MessangerForm activeChat={activeChat} />
            }
        </div>
    )
}
