import React, {useState, useEffect, useRef} from "react";
import Message from "./Message";
import {DbWorker} from "../../../utils/DbWorker";
import {useSelector} from "react-redux";
import ActionsPanel from "./ActionsPanel";
import './MessagesArea.scss';
import {ConversationManager} from "../Conversation/ConversationManager";
import {IChat, IMessage} from "../../../types/globalTypes";
import {IAppState, ICombinedState, ISystemState} from "../../../redux/reduxTypes/rdx";

type propTypes = {
    setPendingMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
    pendingMessages: IMessage[]
};
const MessagesArea: React.FC<propTypes> = ({setPendingMessages, pendingMessages}) => {
    const [selectMessagesMode, setSelectMessagesMode] = useState<boolean>(false);
    const [selectedMessages, setSelectedMessages] = useState<IMessage[]>([]);
    const {chats, curUser, selectedChat} = useSelector<ICombinedState, IAppState>(x => x.app);
    const {conversationManagerOpen} = useSelector<ICombinedState, ISystemState>(x => x.system);
    const mesAreaRef: React.Ref<HTMLDivElement> = useRef(null);
    const curChat: IChat | undefined = chats.find((x: IChat): boolean => x._id === selectedChat);
    useEffect((): void => {
        setSelectMessagesMode(false);
        setSelectedMessages([]);
    }, [selectedChat]);
    useEffect((): void => {
        if (!mesAreaRef.current) {
            return;
        }
        mesAreaRef.current.scrollTop = mesAreaRef.current.scrollHeight - mesAreaRef.current.clientHeight;
    }, [curChat, pendingMessages]);
    useEffect((): void => {
        setPendingMessages([]);
        if (curChat && curChat.activeMessages && curChat.activeMessages.find((m: IMessage): boolean => !!curUser && m.author !== curUser._id && !m.whoRead.includes(curUser._id))) {
            DbWorker.tickMessagesAsRead(curChat);
        }
    }, [curChat]);

    const messages: IMessage[] = (curChat && curChat.activeMessages ? curChat.activeMessages : []).concat(pendingMessages);
    return (
        <>
            {
                conversationManagerOpen && curChat
                    ? <ConversationManager chat={curChat}/>
                    : null
            }
            <div ref={mesAreaRef} className={'MessagesArea'}>
                <div className={'MessagesContainer'}>
                    {messages.length
                        ? messages.map((msg: IMessage, index: number, array: IMessage[]): React.ReactNode =>
                            <Message key={array[array.length - 1 - index]._id}
                                     message={array[array.length - 1 - index]}
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
};
export default MessagesArea;
