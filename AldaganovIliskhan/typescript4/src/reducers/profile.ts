import { Reducer } from "redux";
import {
  ProfileActionsTypes,
  ProfileActions,
  ProfileType,
} from "../actions/profile";
export type ProfileReducerState = {
  profileData: ProfileType | null;
  isProfileError: boolean;
  isProfileLoading: boolean;
};
const initialState = {
  profileData: null,
  isProfileError: false,
  isProfileLoading: false,
};

export const profile: Reducer<ProfileReducerState, ProfileActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProfileActionsTypes.SET_PROFILE:
      return {
        ...state,
        profileData: action.payload,
      };
    case ProfileActionsTypes.SET_PROFILE_ERROR:
      return {
        ...state,
        isProfileError: action.payload,
      };
    case ProfileActionsTypes.SET_PROFILE_LOADING:
      return {
        ...state,
        isProfileLoading: action.payload,
      };
    default:
      return state;
  }
};
