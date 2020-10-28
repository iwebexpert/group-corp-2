import { setChatFire, setChatUnFire, NEW_MESSAGE } from '../actions/chatActions'

let thisChatID = NaN;
export const fireChatMiddleware = (store) => (next) => (action) => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        if (action.payload.action === 'POP') {
            return next(action);
        }
        thisChatID = action.payload.location.pathname.slice(-1);
        if (isNaN(+thisChatID)) {
            return next(action);
        }
        store.dispatch(setChatUnFire({
            chatID: +thisChatID
        }));
    }
    if (action.type === NEW_MESSAGE) {
        const { chatID } = action.payload;
        if (+thisChatID === +chatID) {
            return next(action)
        }
        store.dispatch(setChatFire({ chatID }));
    }
    return next(action)
}