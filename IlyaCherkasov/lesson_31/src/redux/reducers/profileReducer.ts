import update from 'react-addons-update';
import { Reducer } from 'redux';

import { ProfileActionType } from '../actions/profileActions';

export type profileReducerState = {
  profileEntries: {};
  error: boolean;
  loading: boolean;
};

const initialState: profileReducerState = {
  profileEntries: {},
  error: false,
  loading: false,
};

export const profileReducer: Reducer<profileReducerState> = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionType.PROFILE_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ProfileActionType.PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        profileEntries: action.payload,
      };
    case ProfileActionType.PROFILE_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ProfileActionType.PROFILE_POST_SUCCESS:
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