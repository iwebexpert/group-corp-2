import React, {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {DbWorker} from "../../../utils/DbWorker";
import {useDispatch, useSelector} from "react-redux";
import ActionsPanel from "./ActionsPanel";
import './MessagesArea.scss';

export default ({setPendingMessages, pendingMessages}) => {
    const [selectMessagesMode, setSelectMessagesMode] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const {chats, curUser, selectedChat} = useSelector(x => x.app);
    const dispatch = useDispatch();
    const mesAreaRef = useRef();
    const curChat = chats.find(x => x._id === selectedChat);
    useEffect(() => {
        setSelectMessagesMode(false);
        setSelectedMessages([]);
    }, [selectedChat]);
    useEffect(() => {
        mesAreaRef.current.scrollTop = mesAreaRef.current.scrollHeight - mesAreaRef.current.clientHeight;
    }, [curChat, pendingMessages]);
    useEffect(() => {
        setPendingMessages([]);
        if (curChat && curChat.activeMessages.find(m => m.author !== curUser._id && !m.isRead)){
            DbWorker.tickMessagesAsRead(curChat);
        }
    }, [curChat]);

    const messages = (curChat && curChat.activeMessages ? curChat.activeMessages : []).concat(pendingMessages);
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
