import {profileActionTypes} from '../actions/actionTypes'
import {ProfileActions} from '../actions/profile'
import {Reducer} from 'redux'

export type ProfileReducerState = {
	profileInfo: any,
	loading: boolean,
	error: boolean,
}

const initialState: ProfileReducerState = {
	profileInfo: {},
	loading: false,
	error: false,
}

export const profileReducer: Reducer<ProfileReducerState, ProfileActions> = (state = initialState, action) => {
	switch (action.type) {
		case profileActionTypes.PROFILE_LOAD_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case profileActionTypes.PROFILE_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				profileInfo: action.data
			}

		case profileActionTypes.PROFILE_LOAD_ERROR:
			return {
				...state,
				loading: false,
				error: true
			}

		default:
			return state
	}
}