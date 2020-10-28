import {
    CHATS_MESSAGE_SEND_REQUEST,
    CHATS_MESSAGE_SEND_SUCCESS,
    CHATS_MESSAGE_SEND_FAILURE,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_FAILURE,
    MESSAGES_LOAD_REQUEST,
    MESSAGES_LOAD_SUCCESS,
    MESSAGES_LOAD_FAILURE,

} from "../actions/messages";
import { InitialMessagesType, ActionMessagesType } from "../types";

const initialState: InitialMessagesType = {
    entries: {},
    loading: false,
    error: false,
};

export const messagesReducer = (state = initialState, action: ActionMessagesType): InitialMessagesType => {
    switch (action.type) {
        case MESSAGES_LOAD_REQUEST:

            return {
                ...state,
                loading: true,
                error: false,
            };

        case MESSAGES_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            };

        case MESSAGES_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case CHATS_MESSAGE_SEND_REQUEST:
            return state;

        case CHATS_MESSAGE_SEND_SUCCESS:
            return state

        case CHATS_MESSAGE_SEND_FAILURE:
            return state;

        case DELETE_MESSAGE_REQUEST:
            return state;

        case DELETE_MESSAGE_SUCCESS:
            return state;
        case DELETE_MESSAGE_FAILURE:
            return state;
        default:
            return state;
    }
};