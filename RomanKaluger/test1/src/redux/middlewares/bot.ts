import connectionConfig from "../../configs/connectionConfig";
import {DbWorker} from "../../utils/DbWorker";
import {sendMessage} from "../actions";
import {AnyAction, Dispatch, Middleware, MiddlewareAPI, Store} from "redux";
import {IChat, IMessage, IUser} from "../../configs/globalTypes";
import {ICombinedState} from "../rdx";
import {CommonAction} from "../rdxActions";

interface UserTimeOuts {
    [key: string]: NodeJS.Timeout;
}
const petyaTimeOut: UserTimeOuts = {};
export const botMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<AnyAction>, ICombinedState>) => (next: Dispatch) => (action: CommonAction) => {
    if(action.type === sendMessage({}).type){
        const {chats, selectedChat, curUser}: {chats: IChat[], selectedChat: string | null, curUser: IUser | null} = store.getState().app;
        const chat: IChat | undefined = chats.find((ch: IChat): boolean => ch._id === selectedChat);
        if (chat && chat.members.includes('5f79fd1a432d496ad47f39d1')){
            clearTimeout(petyaTimeOut[chat._id]);
            petyaTimeOut[chat._id] = setTimeout(async (): Promise<void> => {
                    DbWorker.reqAuthorized(`${connectionConfig.hostHttp}/chats/shared/${chat.sharedId}/message`, {
                        text: `Привет, ${curUser ? curUser.name :'Незнакомец'}, я Петя-бот`,
                        dateSend: Date.now(),
                        author: '5f79fd1a432d496ad47f39d1',
                        authorName: 'Петя',
                        forwardMessages:[],
                        isForward: false
                    });

            },5000);
        }
    }
    return next(action);
};
