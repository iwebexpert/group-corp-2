import {profileActionTypes} from '../actions/actionTypes'
import {ProfileActions} from '../actions/profile'
import {Reducer} from 'redux'


const initialState: ProfileReducerState = {
	profileInfo: {name: '', id: 0, age: 0, email: ''},
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
				profileInfo: action.profile
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