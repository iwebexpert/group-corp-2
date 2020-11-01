import { Reducer } from "react";
import { ProfileActions, ProfileActionTypes } from "../actions/profile";

export type ProfileReducerState = {
  entries: any;
  loadStatus: string | null;
  error: boolean;
};
const initialState: ProfileReducerState = {
  entries: {},
  loadStatus: null,
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
        loadStatus: "loading",
        error: false,
      };
    case ProfileActionTypes.PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        loadStatus: "loaded",
        entries: action.payload,
      };

    case ProfileActionTypes.PROFILE_LOAD_FAILURE:
      return {
        ...state,
        loadStatus: null,
        error: true,
      };

    default:
      return state;
  }
};
