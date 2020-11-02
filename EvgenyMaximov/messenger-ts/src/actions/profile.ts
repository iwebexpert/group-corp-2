import { createAction } from "redux-api-middleware";

export enum ProfileActionTypes {
	 LOAD_PROFILE_REQUEST = "LOAD_PROFILE_REQUEST",
	 LOAD_PROFILE_SUCCESS = "LOAD_PROFILE_SUCCESS",
	 LOAD_PROFILE_FAILURE = "LOAD_PROFILE_FAILURE",
};

export const profileLoadAction = () =>
  createAction({
    endpoint: "http://localhost:4000/profile",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [ProfileActionTypes.LOAD_PROFILE_REQUEST, ProfileActionTypes.LOAD_PROFILE_SUCCESS, ProfileActionTypes.LOAD_PROFILE_FAILURE],
  });
