import { createAction } from "redux-api-middleware";

export const PROFILE_USER_REQUEST = "PROFILE_USER_REQUEST";
export const PROFILE_USER_SUCCESS = "PROFILE_USER_SUCCESS";
export const PROFILE_USER_FAILURE = "PROFILE_USER_FAILURE";

export const profileUserAction = () =>
  createAction({
    endpoint: "/api/profiles/0",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [PROFILE_USER_REQUEST, PROFILE_USER_SUCCESS, PROFILE_USER_FAILURE],
  });
