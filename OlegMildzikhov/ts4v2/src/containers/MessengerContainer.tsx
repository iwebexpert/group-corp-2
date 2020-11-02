import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import {useParams} from 'react-router-dom';

import {Messenger} from '../components/Messenger';
import {chatsLoadAction, chatsMessageSendAction, chatsAddAction} from '../actions/chats';
import {AppState} from '../reducers';



export const MessengerContainer: React.FC = () => {
    const dispatch = useDispatch();
    const {id} = useParams<{id: string}>();

    const chats = useSelector((state: AppState) => state.chats.entries);
    const messages = chats[id] ? chats[id].messages : null;

    const [isLoading, isError] = useSelector((state: AppState) => [state.chats.loading, state.chats.error]);

    useEffect(() => {
        dispatch(chatsLoadAction());
    }, []);

    const handleMessageSend = (message: MesageType) => {
        dispatch(chatsMessageSendAction({
            ...message,
            chatId: id,
        }));
    };

    const handleChatAdd = () => {
        const title = prompt('Введите название чата', 'Chat1');
        const lastChatId = Object.keys(chats).length;

        if(title){
            dispatch(chatsAddAction(lastChatId, title));
            dispatch(push(`/chats/${lastChatId}`));
        } else {
            alert('Введите название чата');
        }
    };

    const handleChatsReload = () => {
        dispatch(chatsLoadAction());
    }

    return <Messenger 
        isError={isError} 
        isLoading={isLoading} 
        messages={messages} 
        handleMessageSend={handleMessageSend} 
        handleChatAdd={handleChatAdd}
        handleChatsReload={handleChatsReload}
         />;
};