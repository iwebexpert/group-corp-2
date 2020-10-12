import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setMessage } from '../actions/chatActions';
import MessageForm from '../../components/MessageForm';

const MessageFormContainer = ({ classN }) => {
    const author = useSelector((state) => state.profile.profileEntries.author);
    const [text, setText] = useState('');
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleSetMessage = () => {
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
    const handleKeyDown = (event) => {
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