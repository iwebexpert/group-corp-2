import { LOCATION_CHANGE } from 'react-router-redux';
import { unfireChatAC } from '../actions/addChatAC';

export const activeChatMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {

        let arrUrl = window.location.pathname.split('/');
        let id = arrUrl[arrUrl.length - 1];

        if (id && id !== 'profile') {
            store.dispatch(unfireChatAC(id))
        }

    }
    return next(action);
};