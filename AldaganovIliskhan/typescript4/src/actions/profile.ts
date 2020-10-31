import axios from "axios";
import { ActionCreator, Dispatch } from "redux";
export enum ProfileActionsTypes   {
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
export type ProfileType = {
  id: number,
  name:string 
  nickname: string
  age: number
};
export type ProfileActions = setProfileError | setProfileLoading | setProfile;
export const setProfileError : ActionCreator<setProfileError> = (payload : boolean) => ({
  type: ProfileActionsTypes.SET_PROFILE_ERROR,
  payload,
});
export const setProfileLoading : ActionCreator<setProfileLoading> = (payload : boolean) => ({
  type: ProfileActionsTypes.SET_PROFILE_LOADING,
  payload,
});
export const setProfile : ActionCreator<setProfile> = (profile : ProfileType) => ({
  type: ProfileActionsTypes.SET_PROFILE,
  payload: profile,
});
export const fetchProfile = () => (dispatch : Dispatch) => {
  dispatch(setProfileLoading(true));
  dispatch(setProfileError(false));
  axios
    .get<ProfileType>("http://localhost:3001/profile")
    .then<void>(({ data }) => {
      dispatch(setProfile(data));
      dispatch(setProfileLoading(false));
    })
    .catch<void>(() => {
      dispatch(setProfileError(true));
    });
};

