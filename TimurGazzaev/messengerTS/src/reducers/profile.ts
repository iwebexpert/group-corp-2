import {Reducer} from 'redux'

import {ProfileActions} from '../actions/profile'

export type ProfileReducerState = {
    profiles: any,
    loading: boolean,
    error: boolean
}

const initialState: ProfileReducerState = {
    profiles: [],
    loading: true,
    error: false
}

export const profileReducer: Reducer<ProfileReducerState, ProfileActions> = (state = initialState, action: any) => {
    switch (action.type) {
        case 'PROFILES_LOAD_REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
            }

        case 'PROFILES_LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                profiles: action.payload,
            }

        case 'PROFILES_LOAD_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
            }

        default:
            return state;
    }
}
