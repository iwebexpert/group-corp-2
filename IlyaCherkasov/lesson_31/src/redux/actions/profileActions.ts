import { createAction } from 'redux-api-middleware';

import { NewProfileType } from '../../types'

export enum ProfileActionType {
  PROFILE_LOAD_REQUEST = 'PROFILE_LOAD_REQUEST',
  PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS',
  PROFILE_LOAD_FAILURE = 'PROFILE_LOAD_FAILURE',
  PROFILE_POST_SUCCESS = 'PROFILE_POST_SUCCESS',
}

export const profileLoadAction = () => createAction({
  endpoint: 'http://localhost:4000/profile',
  method: "GET",
  headers: { "Content-Type": "application/json" },
  types: [
    ProfileActionType.PROFILE_LOAD_REQUEST,
    ProfileActionType.PROFILE_LOAD_SUCCESS,
    ProfileActionType.PROFILE_LOAD_FAILURE,
  ],
});

export const profilePostAction = (profileData: NewProfileType) => createAction({
  endpoint: 'http://localhost:4000/profile',
  method: "POST",
  body: JSON.stringify(profileData),
  headers: { "Content-Type": "application/json" },
  types: [
    ProfileActionType.PROFILE_LOAD_REQUEST,
    ProfileActionType.PROFILE_POST_SUCCESS,
    ProfileActionType.PROFILE_LOAD_FAILURE,
  ],
});
