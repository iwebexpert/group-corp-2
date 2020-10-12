import { PROFILE_USER } from "../actions/profile";
import { profile } from "../helpers/profileUser";

const initialState = {
  entries: {},
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_USER:
      return {
        ...state,
        entries: profile,
      };

    default:
      return state;
  }
};
