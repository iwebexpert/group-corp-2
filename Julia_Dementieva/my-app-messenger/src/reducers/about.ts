import {Reducer} from 'redux';

import {AboutActions, AboutActionTypes} from '../actions/about';

export type AboutReducerState = {
    entries: any;
    loading: boolean;
    error: boolean;
    ready: boolean;
};

const initialState: AboutReducerState = {
    entries: {},
    loading: false,
    error: false,
    ready: false,
};

export const aboutReducer: Reducer<AboutReducerState, AboutActions> = (state = initialState, action) => {
    switch(action.type){
        case AboutActionTypes.ABOUT_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
    
        case AboutActionTypes.ABOUT_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                ready: true,
                entries: action.payload,
            };
            
        case AboutActionTypes.ABOUT_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};