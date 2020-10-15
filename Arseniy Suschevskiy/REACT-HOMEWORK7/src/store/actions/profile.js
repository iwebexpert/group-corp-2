import axios from '../../axios'
import {PROFILE_LOAD_ERROR, PROFILE_LOAD_REQUEST, PROFILE_LOAD_SUCCESS} from './actionTypes'

export function profileLoad() {
	return async dispatch => {
		try {
			dispatch(profileLoadRequest())
			const response = await axios.get('/profiles/0')
			dispatch(profileLoadSuccess(await response.data))
		} catch (error) {
			dispatch(profileLoadError(error))
		}
	}
}

export function profileLoadRequest() {
	return {
		type: PROFILE_LOAD_REQUEST,
	}
}

export function profileLoadSuccess(data) {
	return {
		type: PROFILE_LOAD_SUCCESS,
		data
	}
}

export function profileLoadError(error) {
	return {
		type: PROFILE_LOAD_ERROR,
		error
	}
}