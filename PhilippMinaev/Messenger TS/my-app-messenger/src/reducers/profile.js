import {
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_FAILURE,
} from "../actions/profile";

const initialState = {
  entries: {},
  loadStatus: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD_REQUEST:
      return {
        ...state,
        loadStatus: "loading",
      };
    case PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        loadStatus: "loaded",
        entries: action.payload,
      };

    case PROFILE_LOAD_FAILURE:
      return {
        ...state,
        loadStatus: null,
      };

    default:
      return state;
  }
};
