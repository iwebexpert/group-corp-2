import update from 'react-addons-update';

import {
    USER_INFO_LOAD_REQUEST,
    USER_INFO_LOAD_SUCCESS,
    USER_INFO_LOAD_FAILURE,
} from '../actions/user'

import {userProfile} from "../helpers/userProfile";

const initialState = {
    entries: {},
    loading: false,
    error: false,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case USER_INFO_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: userProfile,
            };

        case USER_INFO_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
}