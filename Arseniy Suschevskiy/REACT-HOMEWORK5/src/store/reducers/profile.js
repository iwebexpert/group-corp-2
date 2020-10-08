import {PROFILE_LOAD} from '../actions/actionTypes'
import {profileData} from '../../helpers/profileData'

const initialState = {
	profileInfo: {},
}

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_LOAD:
			return {
				...state,
				profileInfo: profileData
			}

		default:
			return state
	}
}