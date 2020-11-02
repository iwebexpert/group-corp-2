import { createAction } from "redux-api-middleware";

export enum ProfileActionTypes {
  PROFILE_INFO_REQUEST = "PROFILE_INFO_REQUEST",
  PROFILE_INFO_SUCCESS = "PROFILE_INFO_SUCCESS",
  PROFILE_INFO_FAILURE = "PROFILE_INFO_FAILURE",
}

export const profileInfoAction = () =>
  createAction({
    endpoint: "http://localhost:4000/profiles/0",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      ProfileActionTypes.PROFILE_INFO_REQUEST,
      ProfileActionTypes.PROFILE_INFO_SUCCESS,
      ProfileActionTypes.PROFILE_INFO_FAILURE,
    ],
  });
