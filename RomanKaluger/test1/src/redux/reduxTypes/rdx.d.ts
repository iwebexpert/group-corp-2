import {wsStatus} from "../../configs/statuses";
import {IChat, IContacts, IUser} from "../../types/globalTypes";
import {RouterState} from "connected-react-router";


export interface IAppState {
    wsStatus: wsStatus;
    curUser: IUser | null;
    selectedChat: string | null;//id
    chats: IChat[];
    contacts: IContacts;
    userProfileToShow: IUser | null;
}

export interface ISystemState {
    forwardMessage: any;
    loading: boolean;
    error: { message: string } | null;
    contactsLoading: boolean;
    commonViewImages: any;
    aboutPageOpen: boolean;
    createConversationOpen: boolean;
    conversationManagerOpen: boolean;
}

export interface ICombinedState {
    router: RouterState;
    app: IAppState;
    system: ISystemState;
}

