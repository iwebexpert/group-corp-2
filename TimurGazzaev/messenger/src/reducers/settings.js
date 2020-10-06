import {
    SET_DRAWER,
} from '../actions/settings'

const initialState = {
    isDrawerOpen: true
}

export const settingsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_DRAWER:
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen,
            }
        default:
            return state;
    }
}
