import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {chatsLoadAction, chatsListSendAction, messageUnfireAction} from '../actions/chats2';
import {push} from 'connected-react-router';

import {ChatsList} from '../components/ChatsList'

import {AppState} from '../reducers';

export const ChatsListContainer: React.FC = () => {

    const dispatch = useDispatch();

    const [ready, entries, fireChatsId] = useSelector((state: AppState) => [state.chats.ready, state.chats.entries, state.chats.fireChatsId]);
    let chatsLoad = (ready) ? entries : null;
    let lastChatId = (ready) ? Object.keys(chatsLoad).length : null;
    let fireListId = (ready) ? fireChatsId : null;
    
    const isLoading = useSelector((state:AppState) => state.chats.loading);

    useEffect(() => {
        if(!chatsLoad) dispatch(chatsLoadAction());
    }, []);

    const chatAddHandler = (newchat: string) => {
        if(lastChatId){
            dispatch(chatsListSendAction({
                id: lastChatId.toString(),
                author: newchat,
                avatar: 'https://cityblank.ru/upload/iblock/cc4/cc47d6df370960cbe120d01e999abfeb.gif',
            }));
            dispatch(push(`/chats/${lastChatId}`));
        }
        
    };

    const chatClickHandler = (chatId: number) =>{
        if (chatId >= 0){
            dispatch(messageUnfireAction({chatId}));
        }
    }

    return( <ChatsList chats={chatsLoad} fireChats={fireListId} onAdd={chatAddHandler} isLoading={isLoading} onClick={chatClickHandler}/>)
    
}