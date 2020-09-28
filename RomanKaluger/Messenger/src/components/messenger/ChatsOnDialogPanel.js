import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedChat} from "../../redux/actions";
import {DbWorker} from "../../utils/DbWorker";

async function getLastMsg(chatId) {
    const messages = await DbWorker.getMessages(chatId);
    if (!messages.length) {
        return '-';
    }
    return messages[messages.length - 1].text;
}

function ChatSelector({chat}) {
    const [message, setMessage] = useState('пусто');
    const {curUser, selectedChat} = useSelector(s => s.app);
    const dispatch = useDispatch();
    useEffect(() => {
        async function f() {
            const msg = await getLastMsg(chat._id, curUser);
            setMessage(msg);
        }

        f();
    }, [curUser, selectedChat]);
    return (
        <div onClick={() => dispatch(setSelectedChat(chat))}
             className={`chatSelector${selectedChat && selectedChat.sharedId === chat.sharedId ? ' chatSelectorSelected' : ''}`}>
            <div className={'chatSelectorTitle'}>
                {chat.title}
            </div>
            <div className={'chatSelectorMessage'}>
                {message}
            </div>
        </div>
    );
}

export default ({chats}) => {
    return (
        <div className={'ChatsSectionDlgPn'}>
            {
                chats.length ? chats.map(ch => <ChatSelector key={ch._id} chat={ch}/>) : 'Чатов нет'
            }
        </div>
    );
};
