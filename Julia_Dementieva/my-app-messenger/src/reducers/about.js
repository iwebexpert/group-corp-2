import {
    ABOUT_LOAD_REQUEST,
    ABOUT_LOAD_FAILURE,
    ABOUT_LOAD_SUCCESS,
} from '../actions/about';

const initialState = {
    entries: {},
    loading: false,
    error: false,
    ready: false,
};

export const aboutReducer = (state = initialState, action) => {
    switch(action.type){
        case ABOUT_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
    
        case ABOUT_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                ready: true,
                entries: action.payload,
            };
            
        case ABOUT_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};