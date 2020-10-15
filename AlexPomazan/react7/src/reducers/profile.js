import {
  PROFILE_USER_REQUEST,
  PROFILE_USER_SUCCESS,
  PROFILE_USER_FAILURE,
} from "../actions/profile";

const initialState = {
  entries: {},
  loading: false,
  error: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case PROFILE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case PROFILE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
