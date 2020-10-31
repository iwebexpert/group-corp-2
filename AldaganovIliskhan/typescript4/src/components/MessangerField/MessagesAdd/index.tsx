import React from 'react'

import { MessagesList } from '../MessagesList';
import './MessagesAdd.scss'
import { MessangerForm } from '../MessangerForm';
import { useSelector } from 'react-redux';
import { MessagesType ,ChatsType} from '../../../actions/chats';
type MessagesAdd = {
    messages : MessagesType[],
    chat : ChatsType,
}
export const MessagesAdd : React.FC<MessagesAdd> = ({ messages, chat }) => {
    const { pathname } = useSelector(({ router } : any) => router.location);
    return (
        <div className="messages__add">
            <MessagesList messages={messages} />
            {
                pathname !== '/' && < MessangerForm chat={chat} />
            }
        </div>
    )
}
