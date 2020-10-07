import React, {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {DbWorker} from "../../../utils/DbWorker";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import ActionsPanel from "./ActionsPanel";
import './MessagesArea.scss';

export default ({setPendingMessages, pendingMessages}) => {
    let [messages, setMessages] = useState([]);
    const [selectMessagesMode, setSelectMessagesMode] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const {chats, curUser} = useSelector(x => x.app);
    const mesAreaRef = useRef();
    const {idchat} = useParams();
    const curChat = chats.find(x => x._id === idchat);
    useEffect(() => {
        if (curChat) {
            async function f() {
                const msgs = await DbWorker.getMessages(curChat._id);
                setMessages(msgs);
            }

            f();
        }
        return () => {
            setSelectMessagesMode(false);
            setSelectedMessages([]);
        }
    }, [curChat]);
    useEffect(() => {
        mesAreaRef.current.scrollTop = mesAreaRef.current.scrollHeight - mesAreaRef.current.clientHeight;
    }, [messages, pendingMessages]);
    useEffect(() => {
        setPendingMessages([]);
        if (messages.find(m => m.author !== curUser._id && !m.isRead)){
            DbWorker.tickMessagesAsRead(curChat);
        }
    }, [messages]);

    messages = messages.concat(pendingMessages);
    return (
        <>
            <div ref={mesAreaRef} className={'MessagesArea'}>
                <div className={'MessagesContainer'}>
                    {messages.length
                        ? messages.map((msg, index, array) =>
                            <Message key={array[array.length - 1 - index]._id}
                                     chat={curChat} message={array[array.length - 1 - index]}
                                     selectMessagesMode={selectMessagesMode}
                                     selectedMessages={selectedMessages}
                                     setSelectMessagesMode={setSelectMessagesMode}
                                     setSelectedMessages={setSelectedMessages}
                            />)
                        : <span className={'NoteText'}>Сообщений пока нет...</span>
                    }
                </div>
            </div>
            {
                selectMessagesMode ? <ActionsPanel selectedMessages={selectedMessages}
                                                   setSelectMessagesMode={setSelectMessagesMode}
                                                   setSelectedMessages={setSelectedMessages}
                /> : null
            }
        </>
    );
}
