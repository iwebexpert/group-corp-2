import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {chatsLoadAction, chatsListSendAction, messageUnfireAction} from '../actions/chats';
import {push} from 'connected-react-router';

import {ChatsList} from '../components/ChatsList'



export const ChatsListContainer = (props) => {

    const dispatch = useDispatch();

    const [ready, entries, fireChatsId] = useSelector((state) => [state.chats.ready, state.chats.entries, state.chats.fireChatsId]);
    let chatsLoad = (ready) ? entries : null;
    let lastChatId = (ready) ? Object.keys(chatsLoad).length : null;
    let fireListId = (ready) ? fireChatsId : null;
    
    const isLoading = useSelector((state) => state.chats.loading);

    useEffect(() => {
        if(!chatsLoad) dispatch(chatsLoadAction());
    }, []);

    const chatAddHandler = (newchat) => {
        dispatch(chatsListSendAction({
            id: lastChatId.toString(),
            author: newchat,
            avatar: 'https://cityblank.ru/upload/iblock/cc4/cc47d6df370960cbe120d01e999abfeb.gif',
        }));
        dispatch(push(`/chats/${lastChatId}`));
    };

    const chatClickHandler = (chatId) =>{
        if (chatId >= 0){
            dispatch(messageUnfireAction({chatId}));
        }
    }

    return( <ChatsList chats={chatsLoad} fireChats={fireListId} onAdd={chatAddHandler} isLoading={isLoading} onClick={chatClickHandler}/>)
    
}