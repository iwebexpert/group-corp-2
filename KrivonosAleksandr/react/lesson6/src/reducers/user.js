import update from 'react-addons-update';

import {
    USER_INFO_LOAD,
} from '../actions/chats'

const initialState = {
    entries: {},
    loading: false,
};

import {userProfile} from '../helpers/userProfile';

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "@@INIT":
            return {
                ...state,
                entries: userProfile,
            };
        default:
            return state;
    }
}