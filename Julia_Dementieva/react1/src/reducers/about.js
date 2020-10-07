import {
    ABOUT_LOAD,
} from '../actions/about';

const initialState = {
    entries: {},
    loading: false,
};

import {person} from '../helper/personData';

export const aboutReducer = (state = initialState, action) => {
    switch(action.type){
        case ABOUT_LOAD:
            return {
                ...state,
                entries: person,
                loading: true,
            };

        default:
            return state;
    }
};