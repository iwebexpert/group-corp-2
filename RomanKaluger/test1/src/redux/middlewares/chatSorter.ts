import {CommonAction} from "../reduxTypes/rdxActions";
import {setChats} from "../actions";
import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from "redux";
import {ICombinedState} from "../reduxTypes/rdx";
import {IChat} from "../../types/globalTypes";

export const sortChatsMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<AnyAction>, ICombinedState>) => (next: Dispatch) => (action: CommonAction) => {
    if (action.type === setChats({} as IChat[]).type) {
        const chats: IChat[] = action.payload;
        chats.sort((a: IChat, b: IChat): number => (a.lastMessage ? a.lastMessage.dateSend : -1) < (b.lastMessage ? b.lastMessage.dateSend : -1) ? 1 : -1);
    }
    return next(action);
};
