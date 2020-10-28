import {wsStatus} from "../configs/statuses";
import {IChat, IContacts, IUser} from "../configs/globalTypes";
import {connectRouter, RouterState} from "connected-react-router";
import {AppReducer} from "./Reducers/AppReducer";
import {SystemReducer} from "./Reducers/SystemReducer";
import {Reducer} from "redux";

export interface IAppState {
    wsStatus: wsStatus;
    curUser: IUser | null;
    selectedChat: string | null;//id
    chats: IChat[];
    contacts: IContacts;
    userProfileToShow: IUser | null;
}
export interface ISystemState {//toDO
    forwardMessage: any;
    loading: boolean;
    error: {message: string} | null;
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

