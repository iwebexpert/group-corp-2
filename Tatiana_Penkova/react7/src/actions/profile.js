import { createAction } from "redux-api-middleware";
import { api } from "./chats";

export const PROFILE_INFO_REQUEST = "PROFILE_INFO_REQUEST";
export const PROFILE_INFO_SUCCESS = "PROFILE_INFO_SUCCESS";
export const PROFILE_INFO_FAILURE = "PROFILE_INFO_FAILURE";

export const profileInfoAction = () => createAction({
    endpoint: `${api}/profiles/0`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        PROFILE_INFO_REQUEST,
        PROFILE_INFO_SUCCESS,
        PROFILE_INFO_FAILURE,
    ],
});