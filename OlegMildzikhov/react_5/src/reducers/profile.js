import {PROFILE} from '../actions/profile';

const initialState = {
    entries: {},
    loading: false,
};

import {profileData} from '../helpers/ProfileData/ProfileData';

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
