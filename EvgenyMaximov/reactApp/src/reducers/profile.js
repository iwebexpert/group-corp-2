import {
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAILURE,
} from "../actions/profile";

const initialState = {
  entries: {},
  loading: false,
  error: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case LOAD_PROFILE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default:
      return state;
  }
};
