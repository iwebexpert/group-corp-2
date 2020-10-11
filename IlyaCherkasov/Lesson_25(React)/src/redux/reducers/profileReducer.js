import update from 'react-addons-update';

import { PROFILE_LOAD, NEW_PROFILE } from '../actions/proifleAcrions';

const initialState = {
  profileEntries: {},
};

import { profileData } from '../../helpers/profileData';

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOAD:
      return {
        ...state,
        profileEntries: profileData,
      };
    case NEW_PROFILE:
      return update(state, {
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