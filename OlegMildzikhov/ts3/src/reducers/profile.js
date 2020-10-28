import {PROFILE} from '../actions/profile';
import {profileData} from '../helpers/ProfileData/ProfileData';

const initialState = {
    entries: {},
    loading: false,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE:
            return {
                ...state,
                entries: profileData,
            };

        default:
            return state;
    }
};
