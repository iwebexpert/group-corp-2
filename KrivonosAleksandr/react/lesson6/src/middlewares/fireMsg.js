import {messageFireAction} from '../actions/chats';

export const fireMiddleware = store => next => action => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        if (/\/chats\/\d+/.test(store.getState().router.location.pathname)) {
            let chatId = action.payload.location.pathname.replace('/chats/', '');
            if(parseInt(chatId) || chatId === '0') {
                store.dispatch(messageFireAction({chatId}));
            }
        }
    }
    return next(action);
};