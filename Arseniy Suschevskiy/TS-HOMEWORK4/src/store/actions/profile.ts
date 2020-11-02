import axios from '../../axios'
import {profileActionTypes} from '../actions/actionTypes'
import {ActionCreator, Dispatch} from 'redux'
import {RequestError} from 'redux-api-middleware'



export type profileLoadRequest = {
	type: profileActionTypes.PROFILE_LOAD_REQUEST,
}

export type profileLoadSuccess = {
	type: profileActionTypes.PROFILE_LOAD_SUCCESS,
	profile: profileInfoType
}

export type profileLoadError = {
	type: profileActionTypes.PROFILE_LOAD_ERROR,
	error: boolean,
	payload: RequestError
}

export type ProfileActions =
	profileLoadRequest
	| profileLoadSuccess
	| profileLoadError

export function profileLoad() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(profileLoadRequest())
			const response = await axios.get('/profiles/0')
			dispatch(profileLoadSuccess(await response.data))
		} catch (error) {
			dispatch(profileLoadError(error))
		}
	}
}

export const profileLoadRequest: ActionCreator<profileLoadRequest> = () => ({
	type: profileActionTypes.PROFILE_LOAD_REQUEST,
})

export const profileLoadSuccess: ActionCreator<profileLoadSuccess> = (profile: profileInfoType) => ({
	type: profileActionTypes.PROFILE_LOAD_SUCCESS,
	profile
})

export const profileLoadError: ActionCreator<profileLoadError> = (error: RequestError) => ({
	type: profileActionTypes.PROFILE_LOAD_ERROR,
	error: true,
	payload: error
})