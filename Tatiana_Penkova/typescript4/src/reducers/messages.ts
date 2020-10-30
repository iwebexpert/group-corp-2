import { Reducer } from "redux";
import { MessageActionTypes } from "../actions/messages";
import { InitialMessagesType, ActionMessagesType } from "../types";

const initialState: InitialMessagesType = {
    entries: {},
    loading: false,
    error: false,
};

export const messagesReducer: Reducer<InitialMessagesType, ActionMessagesType> = (state = initialState, action) => {
    switch (action.type) {
        case MessageActionTypes.MESSAGES_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case MessageActionTypes.MESSAGES_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            };
        case MessageActionTypes.MESSAGES_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case MessageActionTypes.CHATS_MESSAGE_SEND_REQUEST:
            return state;
        case MessageActionTypes.CHATS_MESSAGE_SEND_SUCCESS:
            return state;
        case MessageActionTypes.CHATS_MESSAGE_SEND_FAILURE:
            return state;
        case MessageActionTypes.DELETE_MESSAGE_REQUEST:
            return state;
        case MessageActionTypes.DELETE_MESSAGE_SUCCESS:
            return state;
        case MessageActionTypes.DELETE_MESSAGE_FAILURE:
            return state;
        default:
            return state;
    }
};