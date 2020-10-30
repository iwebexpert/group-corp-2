import { LOCATION_CHANGE } from "connected-react-router";
import { chatFireAction, chatUnfireAction } from "../actions/chats";
import { Middleware } from "redux";

export const newMessageAlert: Middleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        const thisState = store.getState();
        const str = thisState.router.location.pathname;
        const chatPath: boolean = /\d+$/.test(str);
        if (chatPath) {
            const thisLocation: RegExpExecArray | null = /\d+$/.exec(str);
            if (thisLocation) {
                const location: any = thisLocation[0];
                setTimeout((): void => {
                    const newState = store.getState();
                    for (let i = 0; i < newState.chats.entries.length; i++) {
                        if (thisState.chats.entries[i] == null) {
                            return
                        }
                        if (newState.chats.entries[i].messages.length > thisState.chats.entries[i].messages.length) {
                            if (i !== location) {
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
                    }
                }, 5000);
            }
        }
    }
    return next(action);
};