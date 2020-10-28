import {wsStatus} from "../../configs/statuses";
import {CommonAction} from '../rdxActions';
import {handleActions} from "redux-actions";
import {
    changeWsStatus,
    locationChanged,
    openUserProfile,
    setChats,
    setContacts,
    setCurrentUser,
    setSelectedChat
} from "../actions";
import {IAppState} from "../rdx";
import {IChat} from "../../configs/globalTypes";
import {History} from "history";
import {Action, AnyAction, Reducer} from "redux";

const initialState: IAppState = {
    wsStatus: wsStatus.CLOSED,
    curUser: null,
    selectedChat: null,//id
    chats: [],
    contacts: {
        friends: [],
        subscriptions: [],
        subscribers: [],
        others: []
    },
    userProfileToShow: null
};
export const AppReducer: Reducer<IAppState, CommonAction> = handleActions<IAppState, CommonAction>({
    [changeWsStatus.toString()]: (state: IAppState, action: CommonAction): IAppState => ({...state, wsStatus: action.payload}),
    [setSelectedChat.toString()]: (state: IAppState, action: CommonAction): IAppState => ({...state, selectedChat: action.payload}),
    [setChats.toString()]: (state: IAppState, action: CommonAction): IAppState => ({...state, chats: action.payload}),
    [setContacts.toString()]: (state: IAppState, action: CommonAction): IAppState => ({...state, contacts: action.payload}),
    [setCurrentUser.toString()]: (state: IAppState, action: CommonAction): IAppState => ({...state, curUser: action.payload}),
    [openUserProfile.toString()]: (state: IAppState, action: CommonAction): IAppState => ({...state, userProfileToShow: action.payload}),
    [locationChanged.toString()]: (state: IAppState, action: CommonAction): IAppState => {
        const path: History.Pathname = action.payload.location.pathname;
        const matchRes: RegExpMatchArray | null = path ? path.match(/^\/messenger\/chats\/(.*)/) : null;
        return !matchRes || !state.chats.find((ch: IChat): boolean => ch._id === matchRes[1]) ? {...state, selectedChat: null} : state;
    },
}, initialState);

