import update from "react-addons-update";
import { profile } from "../helpers/profileUser";

import {
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAILURE,
} from "../actions/profile";

const initialState = {
  entries: {},
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD_REQUEST:
      return {
        ...state,
        entries: profile,
      };
    default:
      return state;
  }
};
