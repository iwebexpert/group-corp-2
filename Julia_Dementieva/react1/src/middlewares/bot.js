import {CHATS_MESSAGE_SEND, chatsMessageSendAction} from '../actions/chats'
import {nanoid} from 'nanoid';

export const botMiddlewares = store => next => action => {
    if(action.type === CHATS_MESSAGE_SEND){
        const {author, chatId} = action.payload;
        if (author !== 'Robot'){
            setTimeout(() => {
                store.dispatch(chatsMessageSendAction(
                    {id: nanoid(), chatId,text: `Hi, ${author}`, author: 'Robot'}
                    ));
            }, 1000);
        }
    }
    return next(action);
};