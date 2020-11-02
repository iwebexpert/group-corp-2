import { ProfileActionTypes } from "../actions/profile";
import {Reducer} from 'redux';

export type ProfileReducerState = {
    entries: any;
    loading: boolean;
    error: boolean;
};

const initialState = {
    entries: {},
    loading: false,
    error: false,
};

export const profileReducer: Reducer<ProfileReducerState> = (state = initialState, action) => {
    switch (action.type) {
        case ProfileActionTypes.PROFILE_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case ProfileActionTypes.PROFILE_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
            };

        case ProfileActionTypes.PROFILE_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    };
};