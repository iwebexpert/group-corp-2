import {PROFILE_LOAD_ERROR, PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS} from '../actions/actionTypes'

const initialState = {
	profileInfo: {},
	loading: false
}

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_LOAD_REQUEST:
			return {
				...state,
				loading: true,
				error: false
			}

		case PROFILE_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				profileInfo: action.data
			}

		case PROFILE_LOAD_ERROR:
			return {
				...state,
				loading: false,
				error: true
			}

		default:
			return state
	}
}