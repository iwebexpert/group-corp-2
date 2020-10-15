import { createAction } from 'redux-api-middleware';

export const PROFILE_LOAD_REQUEST = 'PROFILE_LOAD_REQUEST';
export const PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS';
export const PROFILE_LOAD_FAILURE = 'PROFILE_LOAD_FAILURE';
export const PROFILE_POST_SUCCESS = 'PROFILE_POST_SUCCESS';

export const profileLoadAction = () => createAction({
  endpoint: '/api/profile',
  method: "GET",
  headers: { "Content-Type": "application/json" },
  types: [
    PROFILE_LOAD_REQUEST,
    PROFILE_LOAD_SUCCESS,
    PROFILE_LOAD_FAILURE,
  ],
});

export const profilePostAction = (profileData) => createAction({
  endpoint: '/api/profile',
  method: "POST",
  body: JSON.stringify(profileData),
  headers: { "Content-Type": "application/json" },
  types: [
    PROFILE_LOAD_REQUEST,
    PROFILE_POST_SUCCESS,
    PROFILE_LOAD_FAILURE,
  ],
});
