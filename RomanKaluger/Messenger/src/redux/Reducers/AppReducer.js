import types from "../actionTypes";
import {wsStatuses} from "../../configs/statuses";

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

export const AppReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.UPDATE_WS_CONNECTION_STATUS: return {...state, wsStatus: action.payload};
        case types.SET_SELECTED_CHAT: return {...state, selectedChat: action.payload};
        case types.SET_CHATS: return {...state, chats: action.payload};
        case types.SET_CONTACTS: return {...state, contacts: action.payload};
        case types.SET_CURRENT_USER: return {...state, curUser: action.payload};
        case types.OPENED_USER_PROFILE: return {...state, userProfileToShow: action.payload};
        default: return state;
    }
};
