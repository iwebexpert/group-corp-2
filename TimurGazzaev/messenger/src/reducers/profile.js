import {profile} from '../helpers/profile'

const initialState = {
    profiles: profile
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
