import { createAction } from "redux-api-middleware";
import { api } from "./chats";

export enum ProfileActionTypes {
    PROFILE_INFO_REQUEST = "PROFILE_INFO_REQUEST",
    PROFILE_INFO_SUCCESS = "PROFILE_INFO_SUCCESS",
    PROFILE_INFO_FAILURE = "PROFILE_INFO_FAILURE",
};

export const profileInfoAction = () => createAction({
    endpoint: `${api}/profiles/0`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
        ProfileActionTypes.PROFILE_INFO_REQUEST,
        ProfileActionTypes.PROFILE_INFO_SUCCESS,
        ProfileActionTypes.PROFILE_INFO_FAILURE,
    ],
});