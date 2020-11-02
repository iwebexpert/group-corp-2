import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setMessage } from '../actions/chatActions';
import MessageForm from '../../components/MessageForm';

import { MessageFormComponentType, DefaultProfileRootState, ChatListid } from '../../types'

const MessageFormContainer: React.FC<MessageFormComponentType> = ({ classN }) => {
    const author: string = useSelector((state: DefaultProfileRootState) => state.profile.profileEntries.author);
    const [text, setText] = useState('');
    const { id }: ChatListid = useParams();
    const dispatch = useDispatch();

    const handleSetMessage = (): void => {
        if (text !== '') {
            dispatch(
                setMessage({
                    chatID: +id,
                    id: nanoid(),
                    author: author,
                    text: text,
                    user: 'human',
                })
            );
            setText('');
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.which === 13) {
            handleSetMessage();
        }
    };
    return (
        <MessageForm
            text={text}
            setText={setText}
            author={author}
            chatID={id}
            classN={classN}
            handleSetMessage={handleSetMessage}
            handleKeyDown={handleKeyDown}
        />
    )

}

export default MessageFormContainer