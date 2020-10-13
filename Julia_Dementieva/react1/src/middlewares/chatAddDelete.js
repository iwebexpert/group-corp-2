import {CHATSLISTS_SEND, chatAddServerAction, CHATS_MESSAGE_SEND, messageAddServerAction} from '../actions/chats'

export const chatAddDeleteMiddlewares = store => next => action => {
    if(action.type === CHATSLISTS_SEND){
        store.dispatch(chatAddServerAction(action.payload))
    }

    if(action.type === CHATS_MESSAGE_SEND){
        console.log("SendApi",action.payload )
        store.dispatch(messageAddServerAction(action.payload))
    }

    return next(action);
};