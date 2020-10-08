import { LOAD_PROFILE } from "../actions/profile";

const initialState = {
  entries: {},
  loading: false,
};

import { profile } from "../helpers/profile";

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        entries: profile,
      };
    default:
      return state;
  }
};
