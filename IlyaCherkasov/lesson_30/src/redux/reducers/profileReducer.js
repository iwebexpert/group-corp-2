import update from 'react-addons-update';

import {
  PROFILE_LOAD_FAILURE,
  PROFILE_LOAD_REQUEST,
  PROFILE_LOAD_SUCCESS,
  PROFILE_POST_SUCCESS,
} from '../actions/profileActions';

const initialState = {
  profileEntries: {},
  error: false,
  loading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        profileEntries: action.payload,
      };
    case PROFILE_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case PROFILE_POST_SUCCESS:
      return update(state, {
        loading: {
          $set: false,
        },
        profileEntries: {
          $set: {
            author: action.payload.author,
            age: action.payload.age,
          },
        },
      });
    default:
      return state;
  }
};