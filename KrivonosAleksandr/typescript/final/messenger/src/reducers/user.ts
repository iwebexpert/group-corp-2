import {Reducer} from 'redux';

import {UserActionTypes, ProfileActions} from '../actions/user'

import {userProfile} from "../helpers/userProfile";

export type ProfileReducerState = {
    entries: any;
    loading: boolean;
    error: boolean;
}

const initialState: ProfileReducerState = {
    entries: {},
    loading: false,
    error: false,
};

export const profileReducer: Reducer<ProfileReducerState, ProfileActions> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.USER_INFO_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case UserActionTypes.USER_INFO_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: userProfile,
            };

        case UserActionTypes.USER_INFO_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
}