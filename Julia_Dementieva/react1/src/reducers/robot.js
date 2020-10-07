import {
    ROBOT_LOAD,
} from '../actions/robot';

const initialState = {
    entries: {},
    loading: false,
};

import {robot} from '../helper/robotData';

export const robotReducer = (state = initialState, action) => {
    switch(action.type){
        case ROBOT_LOAD:
            return {
                ...state,
                entries: robot,
                loading: true,
            };

        default:
            return state;
    }
};