import { createAction } from "redux-api-middleware";

export const LOAD_PROFILE_REQUEST = "LOAD_PROFILE_REQUEST";
export const LOAD_PROFILE_SUCCESS = "LOAD_PROFILE_SUCCESS";
export const LOAD_PROFILE_FAILURE = "LOAD_PROFILE_FAILURE";

export const profileLoadAction = () =>
  createAction({
    endpoint: "/api/profile",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [LOAD_PROFILE_REQUEST, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILURE],
  });
