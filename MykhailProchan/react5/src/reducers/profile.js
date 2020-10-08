import {
  PROFILE_LOAD
} from '../actions/profile'

const initialState = {
  entries: {},
  loading: false
}

import { profile } from '../helpers/profile'

export const profileReducer = (state = initialState, action) => {
  if (action.type == PROFILE_LOAD) {
    return {
      ...state,
      entries: profile
    }
  } else {
    return state
  }
}