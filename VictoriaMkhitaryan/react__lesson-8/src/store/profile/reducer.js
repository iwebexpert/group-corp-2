import update from 'react-addons-update';
import * as types from './actionTypes';

const initialState = {
    profiles: [],
    loading: false,
    error: false,
};

export default function chatsReduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.PROFILE_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case types.PROFILE_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                profiles: action.payload,
            };

        case types.PROFILE_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};