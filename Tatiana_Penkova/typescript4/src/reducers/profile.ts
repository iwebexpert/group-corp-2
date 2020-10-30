import { Reducer } from "redux";
import { ProfileActionTypes } from "../actions/profile";
import { ActionProfileType, InitailProfileStateType } from "../types";

const initialState: InitailProfileStateType = {
    entries: {},
    loading: false,
    error: false,
};

export const profileReducer: Reducer<InitailProfileStateType, ActionProfileType> = (state = initialState, action) => {
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
    }
};