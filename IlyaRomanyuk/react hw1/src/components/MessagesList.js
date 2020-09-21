import React, { useState } from 'react';
import Message from './Message';

const MessagesList = ({ messagesData }) => {
    let [items, changeItems] = useState(messagesData);

    let addMessage = () => {
        changeItems([...items, 'нормально'])
    }

    return (
        <div className="text">
            {items.map((item, index) => (<Message text={item} author="WebDev" key={index} />))}
            <button className="btn" onClick={addMessage}>Добавить сообщение</button>
        </div>
    )
};

export default MessagesList;
