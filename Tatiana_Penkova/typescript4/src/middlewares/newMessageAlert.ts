import { LOCATION_CHANGE } from "connected-react-router";
import { chatFireAction, chatUnfireAction } from "../actions/chats";
import { Middleware } from "redux";

export const newMessageAlert: Middleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        const thisState = store.getState();
        setTimeout((): void => {
            const newState = store.getState();
            for (let i = 0; i < newState.chats.entries.length; i++) {
                if (thisState.chats.entries[i] == null) {
                    return;
                }
                if (newState.chats.entries[i].messages.length > thisState.chats.entries[i].messages.length && newState.chats.entries[i].messages[newState.chats.entries[i].messages.length - 1].author === "Bot") {
                    store.dispatch(chatFireAction(
                        i,
                        setTimeout((): void => {
                            store.dispatch(chatUnfireAction(
                                i
                            ));
                        }, 9000)
                    ));
                }
            }
        }, 5000);
    }
    return next(action);
};