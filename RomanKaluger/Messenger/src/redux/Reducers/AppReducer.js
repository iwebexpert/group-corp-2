import types from "../actionTypes";
import {wsStatuses} from "../../configs/statuses";

const initialState={
    wsStatus: wsStatuses.CLOSED,
    chats: {
        id1: []
    }
};

export const AppReducer = (state = initialState, action)=>{
    switch (action.type) {
        case types.UPDATE_WS_CONNECTION_STATUS: return {...state, wsStatus: action.payload};
        case types.SEND_MESSAGE: return {...state, chats: {...state.chats, id1: state.chats.id1.concat([action.payload])}};
        default: return state;
    }
};
