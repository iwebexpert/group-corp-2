import axios from "axios";
import { ActionCreator } from "redux";
export enum ProfileActionsTypes  {
  SET_PROFILE_ERROR = "SET_PROFILE_ERROR",
  SET_PROFILE_LOADING = "SET_PROFILE_LOADING",
  SET_PROFILE = "SET_PROFILE"
};
type setProfileError = {
  type : ProfileActionsTypes.SET_PROFILE_ERROR,
  payload : any
};
type setProfileLoading = {
  type : ProfileActionsTypes.SET_PROFILE_LOADING,
  payload : any
};
type setProfile = {
  type : ProfileActionsTypes.SET_PROFILE,
  payload : any
};
export type ProfileActions = setProfileError | setProfileLoading | setProfile;
export const setProfileError : ActionCreator<setProfileError> = (payload : any) => ({
  type: ProfileActionsTypes.SET_PROFILE_ERROR,
  payload,
});
export const setProfileLoading : ActionCreator<setProfileLoading> = (payload : any) => ({
  type: ProfileActionsTypes.SET_PROFILE_LOADING,
  payload,
});
export const setProfile : ActionCreator<setProfile> = (profile : any) => ({
  type: ProfileActionsTypes.SET_PROFILE,
  payload: profile,
});
export const fetchProfile = () => (dispatch : any) => {
  dispatch(setProfileLoading(true));
  dispatch(setProfileError(false));
  axios
    .get("http://localhost:3001/profile")
    .then(({ data }) => {
      dispatch(setProfile(data));
      dispatch(setProfileLoading(false));
    })
    .catch(() => {
      dispatch(setProfileError(true));
    });
};

