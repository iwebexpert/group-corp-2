import {DbWorker} from "../../../utils/DbWorker";
import connectionConfig from "../../../configs/connectionConfig";
import {setChats, setContacts} from "../../../redux/actions";
import {store} from "../../../redux/StorageRedux";
import {Dispatch} from "redux";
import {CommonAction} from "../../../redux/reduxTypes/rdxActions";
import {IChat, IUser} from "../../../types/globalTypes";

export class UpdaterMessenger {
    static dispatch: Dispatch<CommonAction> = store.dispatch;
    static updateChats = async (): Promise<void> => {
        const curUser: IUser | null = store.getState().app.curUser;
        if (curUser) {
            const defaultChatsRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/owner/${curUser._id}`, curUser);
            const defaultChats: IChat[] = await defaultChatsRes.json();
            UpdaterMessenger.dispatch(setChats(defaultChats));
        }
    };
    static updateChat = async (sharedId: string): Promise<void> => {
        const {curUser, chats}: {curUser: IUser | null, chats: IChat[]} = store.getState().app;
        if (curUser) {
            const needChat: IChat | undefined = chats.find((ch: IChat): boolean => ch.sharedId === sharedId);
            if (!needChat){
                return;
            }
            const chatRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/chats/chat/${needChat._id}`, curUser);
            const chat: IChat= await chatRes.json();
            UpdaterMessenger.dispatch(setChats(chats.map((ch: IChat): IChat => ch._id === chat._id ? chat : ch)));
        }
    };
    static updateContacts = async (input: string): Promise<void> => {
        const curUser: IUser | null = store.getState().app.curUser;
        if (curUser) {
            let friendsRes: Response, subscribersRes: Response, subscriptionsRes: Response, othersRes: Response,
                friends: IUser[], subscribers: IUser[], subscriptions: IUser[], others: IUser[];
            friendsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/friends/ownerid/${curUser._id}`, curUser);
            subscribersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/subscribers/ownerid/${curUser._id}`, curUser);
            subscriptionsRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/user/subscriptions/ownerid/${curUser._id}`, curUser);
            friends = await friendsRes.json();
            subscribers = await subscribersRes.json();
            subscriptions = await subscriptionsRes.json();
            if (!input) {
                others = [];
            } else {
                othersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/name/${input}`, curUser);
                others = await othersRes.json();
                others = others.filter((x: IUser): boolean => x._id !== curUser._id);
            }
            UpdaterMessenger.dispatch(setContacts({
                friends,
                subscriptions,
                subscribers,
                others
            }));
        }
    };
}
