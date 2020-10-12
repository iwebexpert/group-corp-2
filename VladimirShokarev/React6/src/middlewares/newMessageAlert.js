import { LOCATION_CHANGE } from "connected-react-router";
import { chatFireAction, chatUnfireAction } from "../actions/chats";

export const newMessageAlert = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        const thisState = store.getState();
        const str = thisState.router.location.pathname;
        const chatPath = /\d+$/.test(str);
        if (chatPath) {
            const location = /\d+$/.exec(str)[0];
            setTimeout(() => {
                const newState = store.getState();
                for (let i = 0; i < newState.chats.entries.length; i++) {
                    if (newState.chats.entries[i].messages.length > thisState.chats.entries[i].messages.length) {
                        if (i !== location) {store.dispatch(chatFireAction(i, setTimeout(() => {store.dispatch(chatUnfireAction(i));}, 4000)));}
                    }
                }
            }, 3000);
        }
    }

    return next(action);
};