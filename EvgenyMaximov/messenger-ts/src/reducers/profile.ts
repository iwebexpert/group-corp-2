import { ProfileActionTypes } from "../actions/profile";
import { Reducer } from 'redux';

export type ProfileReducerState = {
	entries: any,
	loading: boolean,
	error: boolean,
};

const initialState:ProfileReducerState = {
  entries: {},
  loading: false,
  error: false,
};

export const profileReducer:Reducer<ProfileReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionTypes.LOAD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case ProfileActionTypes.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case ProfileActionTypes.LOAD_PROFILE_FAILURE: {
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
