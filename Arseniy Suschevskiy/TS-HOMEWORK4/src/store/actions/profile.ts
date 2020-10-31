import axios from '../../axios'
import {profileActionTypes} from '../actions/actionTypes'
import {ActionCreator, Dispatch} from 'redux'

export type ProfileActions =
	profileLoadRequest
	| profileLoadSuccess
	| profileLoadError

export type profileLoadRequest = {
	type: profileActionTypes.PROFILE_LOAD_REQUEST,
}

export type profileLoadSuccess = {
	type: profileActionTypes.PROFILE_LOAD_SUCCESS,
	data: any
}

export type profileLoadError = {
	type: profileActionTypes.PROFILE_LOAD_ERROR,
	error: any
}

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

export const profileLoadSuccess: ActionCreator<profileLoadSuccess> = (data: any) => ({
	type: profileActionTypes.PROFILE_LOAD_SUCCESS,
	data
})

export const profileLoadError: ActionCreator<profileLoadError> = (error: any) => ({
	type: profileActionTypes.PROFILE_LOAD_ERROR,
	error
})