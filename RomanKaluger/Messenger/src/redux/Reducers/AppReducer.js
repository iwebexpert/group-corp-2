import {wsStatuses} from "../../configs/statuses";
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
const initialState={
    wsStatus: wsStatuses.CLOSED,
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
export const AppReducer = handleActions({
    [changeWsStatus]: (state, action) => ({...state, wsStatus: action.payload}),
    [setSelectedChat]: (state, action) => ({...state, selectedChat: action.payload}),
    [setChats]: (state, action) => ({...state, chats: action.payload}),
    [setContacts]: (state, action) => ({...state, contacts: action.payload}),
    [setCurrentUser]: (state, action) => ({...state, curUser: action.payload}),
    [openUserProfile]: (state, action) => ({...state, userProfileToShow: action.payload}),
    [locationChanged]: (state, action) => {
        const path = action.payload.location.pathname;
        const matchRes = path ? path.match(/^\/messenger\/chats\/(.*)/) : null;
        return !matchRes || !state.chats.find(ch => ch._id === matchRes[1]) ? {...state, selectedChat: null} : state;
    },
}, initialState);

