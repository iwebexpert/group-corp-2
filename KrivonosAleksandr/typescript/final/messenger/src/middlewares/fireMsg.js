// import {Middleware} from "redux";
import {messageFireAction} from '../actions/chats';

export const fireMiddleware = store => next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        let chatId = action.payload.location.pathname.replace('/chats/', '');
        if(parseInt(chatId) || chatId === '0') {
            store.dispatch(messageFireAction({chatId}));
        }
    }
    return next(action);
};