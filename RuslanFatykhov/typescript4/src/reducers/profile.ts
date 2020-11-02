import { Reducer } from "redux";
import { ProfileActions, ProfileActionTypes } from "../actions/profile";

export type ProfileReducerState = {
  entries: any;
  loading: boolean;
  error: boolean;
};

const initialState: ProfileReducerState = {
  entries: {},
  loading: false,
  error: false,
};

export const profileReducer: Reducer<ProfileReducerState, ProfileActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case ProfileActionTypes.PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };

    case ProfileActionTypes.PROFILE_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  };
};
