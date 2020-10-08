import { PROFILE_INFO } from "../actions/profile";
import { profile } from "../Helpers";

const initialState = {
    entries: {},
    loading: false,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_INFO:
            console.log(state)
            return {
                ...state,
                entries: profile,
            };

        default:
            return state;
    }
};