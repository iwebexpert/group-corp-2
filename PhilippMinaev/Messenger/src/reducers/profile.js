import { PROFILE_LOAD } from "../actions/profile";

const initialState = {
  entries: {},
  loading: false,
};

import { profile } from "../helpers/profileData";

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      return {
        ...state,
        entries: profile,
        loading: true,
      };

    default:
      return state;
  }
};
