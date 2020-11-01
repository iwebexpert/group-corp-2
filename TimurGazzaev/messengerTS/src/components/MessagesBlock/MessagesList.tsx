import React, {useEffect} from 'react'
import {Message, MessageType} from './Message'

type MessagesListType = {
    messages: MessageType[]
    handleDeleteMessage: (id: string) => void;
    classes: any
}

export const MessagesList: React.FC<MessagesListType> = ({messages, handleDeleteMessage, classes}) => {

    useEffect(() => {
        // @ts-ignore
        messages && messages.length && document.getElementById((messages[messages.length - 1].id).toString()).scrollIntoView()
    })

    return <div className="messagesList">
        {messages && messages.length
            ? messages.map((item, index) => (
                <Message handleDeleteMessage={handleDeleteMessage} message={item} key={item.id} classes={classes}/>
            ))
            : <div className="emptyMessageBlock">There are no messages. Start chat.</div>
        }
    </div>
}
