import { createAction, RequestError } from "redux-api-middleware";

export enum ProfileActionTypes {
  PROFILE_LOAD_REQUEST = "PROFILE_LOAD_REQUEST",
  PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS",
  PROFILE_LOAD_FAILURE = "PROFILE_LOAD_FAILURE",
}

export type profileLoadRequestAction = {
  type: ProfileActionTypes.PROFILE_LOAD_REQUEST;
};

export type profileLoadSuccessAction = {
  type: ProfileActionTypes.PROFILE_LOAD_SUCCESS;
  payload: any;
};

export type profileLoadFailureAction = {
  type: ProfileActionTypes.PROFILE_LOAD_FAILURE;
  payload: RequestError;
  error: boolean;
};

export type ProfileActions =
  | profileLoadRequestAction
  | profileLoadSuccessAction
  | profileLoadFailureAction;

export const profileLoadAction = () =>
  createAction({
    endpoint: "http://localhost:4000/profiles",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: [
      ProfileActionTypes.PROFILE_LOAD_REQUEST,
      ProfileActionTypes.PROFILE_LOAD_SUCCESS,
      ProfileActionTypes.PROFILE_LOAD_FAILURE,
    ],
  });
