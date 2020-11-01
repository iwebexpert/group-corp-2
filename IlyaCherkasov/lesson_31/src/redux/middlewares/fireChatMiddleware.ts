import { Middleware } from 'redux';
import { setChatFire, setChatUnFire, ChatsActionType } from '../actions/chatActions'

let thisChatID: number = NaN;
export const fireChatMiddleware: Middleware = (store) => (next) => (action) => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        if (action.payload.action === 'POP') {
            return next(action);
        }
        thisChatID = action.payload.location.pathname.slice(-1);
        if (isNaN(thisChatID)) {
            return next(action);
        }
        store.dispatch(setChatUnFire({
            chatID: thisChatID
        }));
    }
    if (action.type === ChatsActionType.NEW_MESSAGE) {
        const { chatID } = action.payload;
        if (+thisChatID === +chatID) {
            return next(action)
        }
        store.dispatch(setChatFire({ chatID }));
    }
    return next(action)
}