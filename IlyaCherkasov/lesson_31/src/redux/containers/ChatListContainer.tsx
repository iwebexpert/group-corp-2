import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

import urlChatIconActive from '../../img/chatIconActive.png';
import urlChatIconNewMessage from '../../img/chatIconNewM.png';
import urlChatIconNotActive from '../../img/chatIconNotActive.png';

import ChatList from '../../components/ChatList/ChatList'
import { chatsPostAction, deleteChat, chatsLoadAction } from '../actions/chatActions';

import { DefaultChatsRootState, ChatListid, ChatsType } from '../../types'

const ChatListContainer: React.FC<{}> = () => {
    const isLoading = useSelector((state: DefaultChatsRootState) => state.chats.loading);
    const isError = useSelector((state: DefaultChatsRootState) => state.chats.error);
    const chats = useSelector((state: DefaultChatsRootState) => state.chats.entries);

    const dispatch = useDispatch();
    const { id }: ChatListid = useParams();

    const [newChatField, setNewChatField] = useState('');

    const sendNewChat = (): void => {
        if (newChatField !== '') {
            dispatch(
                chatsPostAction({
                    title: newChatField,
                    fire: false,
                    messages: [],
                })
            );
        }
        setNewChatField('');
    };

    const fireChat = (chat: ChatsType, chatid: number): string => {
        if (!chat.fire) {
            if (+id === +chatid) {
                return urlChatIconActive;
            }
            return urlChatIconNotActive;
        } else {
            return urlChatIconNewMessage;
        }
    }

    const handlerDeleteChat = (e: React.BaseSyntheticEvent<HTMLImageElement>): void => {
        const chatID: number = +e.target.alt.slice(-1);
        if (+id === chatID) {
            dispatch(deleteChat({ chatID }));
            dispatch(push(`/`));
            return;
        }
        if (+id > chatID) {
            dispatch(deleteChat({ chatID }));
            dispatch(push(`/chats/${+id - 1}`));
            return;
        }
        dispatch(deleteChat({ chatID }));

    }

    const handlerReloadChat = (): void => {
        dispatch(chatsLoadAction());
    }

    if (isLoading) {
        return <ChatList isLoading={true} />
    }
    if (isError) {
        return <ChatList
            isError={true}
            handlerReloadChat={handlerReloadChat}
        />
    }
    return (
        <ChatList
            chats={chats}
            urlChatIconActive={urlChatIconActive}
            urlChatIconNewMessage={urlChatIconNewMessage}
            urlChatIconNotActive={urlChatIconNotActive}
            newChatField={newChatField}
            setNewChatField={setNewChatField}
            sendNewChat={sendNewChat}
            fireChat={fireChat}
            handlerDeleteChat={handlerDeleteChat}
            isLoading={false}
            isError={false}
        />
    )
}

export default ChatListContainer;