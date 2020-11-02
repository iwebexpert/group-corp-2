import {DbWorker} from "../../utils/DbWorker";
import {setChats} from "../actions";
import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from "redux";
import {ICombinedState} from "../reduxTypes/rdx";
import {CommonAction} from "../reduxTypes/rdxActions";
import {IChat, IMessage, IUser} from "../../types/globalTypes";

async function analyzeMessages(chats: IChat[], curUser: IUser | null): Promise<void> {
    if (!curUser) {
        return;
    }
    let chat: IChat;
    for (chat of chats) {
        const messages: IMessage[] | null = (await DbWorker.getMessages(chat._id));
        let unReadCount: number = 0;
        if (!messages) {
            continue;
        }
        messages.forEach((x: IMessage): void => {
            x.isRead = x.author === curUser._id ? x.whoRead.length > 1 : x.whoRead.includes(curUser._id);
            if (!x.isRead && x.author !== curUser._id) {
                unReadCount++;
            }
        });
        chat.unReadCount = messages.reduce((acc: number, x: IMessage): number => acc + (x.author !== curUser._id && !x.whoRead.includes(curUser._id) ? 1 : 0), 0);
        chat.lastMessage = messages[messages.length - 1];
        chat.activeMessages = messages;
    }
}

export const getChatSelectorInfo: Middleware = (store: MiddlewareAPI<Dispatch<AnyAction>, ICombinedState>) => (next: Dispatch) => async (action: CommonAction) => {
    if (action.type === setChats({} as IChat[]).type) {
        const {curUser}: { curUser: IUser | null } = store.getState().app;
        const chats: IChat[] = action.payload;
        await analyzeMessages(chats, curUser);
    }
    return next(action);
};
