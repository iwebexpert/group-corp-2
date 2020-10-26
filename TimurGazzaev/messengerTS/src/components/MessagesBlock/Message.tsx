import React from 'react'
import CloseIcon from '@material-ui/icons/Close'

export type MessageType = {
    id?: string,
    text: string;
    author: string;
    time: string;
}

export type MessageComponentType = {
    message: MessageType
    handleDeleteMessage: (id: string) => void
    classes: any
}

export const Message: React.FC<MessageComponentType> = ({message, handleDeleteMessage, classes}) => {
    return (
        <div id={message.id ? message.id.toString() : undefined} className={message.author === 'Timur' ? 'message' : 'message bot'}>
            <div className="author">{message.author}</div>
            <div className="messageText">
                {message.text}
                <CloseIcon className={classes.closeIcon} onClick={() => handleDeleteMessage(message.id ? message.id : '1')}/>
            </div>
            <div className="time">{message.time}</div>
        </div>
    )
}
