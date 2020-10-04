import React, {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {DbWorker} from "../../../utils/DbWorker";
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export default () => {
    const [messages, setMessages] = useState([]);
    const {chats} = useSelector(x => x.app);
    const mesAreaRef = useRef();
    const {idchat} = useParams();
    const curChat=chats.find(x => x._id === idchat);
    useEffect(() => {
        if (curChat){
            async function f() {
                const msgs = await DbWorker.getMessages(curChat._id);
                setMessages(msgs);
            }
            f();
        }
    }, [curChat]);
    useEffect(() => {
        mesAreaRef.current.scrollTop = mesAreaRef.current.scrollHeight - mesAreaRef.current.clientHeight;
    });
    return (
        <div ref={mesAreaRef} className={'MessagesArea'}>
            {   messages.length
                ? messages.map((msg, index, array) => <Message key={array[array.length - 1 - index]._id} chat={curChat} message={array[array.length - 1 - index]}/>)
                : <span className={'NoteText'}>Сообщений пока нет...</span>
            }
        </div>
    );
}
