import { Middleware } from 'redux';
import {ChatsActionTypes, chatAddServerAction, messageAddServerAction} from '../actions/chats2'

export const chatAddDeleteMiddlewares: Middleware = store => next => action => {
    if(action.type === ChatsActionTypes.CHATSLISTS_SEND){
        store.dispatch(chatAddServerAction(action.payload))
    }

    if(action.type === ChatsActionTypes.CHATS_MESSAGE_SEND){
        store.dispatch(messageAddServerAction(action.payload))
    }

    return next(action);
};