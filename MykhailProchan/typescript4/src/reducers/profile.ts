import { Reducer } from 'react'
import { ProfileActionTypes, ProfileActions } from '../actions/profile'

export type ProfileReducerState = {
  entries: ProfileType,
  loading: boolean,
}

const initialState = {
  entries: {
    id: 0,
    email: '',
    name: ''
  },
  loading: false
}

export const profileReducer: Reducer<ProfileReducerState, ProfileActions> = (state = initialState, action) => {

  switch (action.type) {
    case ProfileActionTypes.PROFILE_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      }

    case ProfileActionTypes.PROFILE_LOAD_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        loading: false,
        entries: action.payload
      }

    case ProfileActionTypes.PROFILE_LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }

    default:
      return state
  }
}