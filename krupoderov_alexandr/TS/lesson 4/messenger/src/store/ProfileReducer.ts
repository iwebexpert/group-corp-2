import {profileAPI} from '../api/profileAPI';
import {ActionCreator, Reducer} from "redux";
import {ThunkAction} from 'redux-thunk';
import {AppState} from './store';

export enum ProfileActionType {
	SET_AUTHOR = 'SET_AUTHOR',
	SET_PHOTO_URL = 'SET_PHOTO_URL'
}

export type setAuthorAction = {
	type: ProfileActionType.SET_AUTHOR,
	author: string
};

export type setPhotoUrlAction = {
	type: ProfileActionType.SET_PHOTO_URL,
	url: string
};

export type ProfileInitialState = {
	author: string,
	photoUrl: string
};

let initialState: ProfileInitialState = {
	author: '',
	photoUrl: ''
};

export type ProfileActions = setAuthorAction | setPhotoUrlAction;

export const ProfileReducer: Reducer<ProfileInitialState, ProfileActions> = (state = initialState, action) => {
	switch (action.type){
		case ProfileActionType.SET_AUTHOR: {
			return {
				...state,
				author: action.author
			};
		}
		case ProfileActionType.SET_PHOTO_URL: {
			return {
				...state,
				photoUrl: action.url
			};
		}
		default: {
			return state
		}
	}
};

export const setAuthor: ActionCreator<setAuthorAction> = (author) => {
	return {
		type: ProfileActionType.SET_AUTHOR,
		author
	};
};

export const setPhotoUrl: ActionCreator<setPhotoUrlAction> = (url) => {
	return {
		type: ProfileActionType.SET_PHOTO_URL,
		url
	};
};

export const getProfileThunk = (): ThunkAction<void, AppState, unknown, ProfileActions> => async (dispatch) => {
	let response = await profileAPI.getProfile();
	const {name, photoUrl} = response;
	dispatch(setAuthor(name));
	dispatch(setPhotoUrl(photoUrl));
};

export const setProfileThunk = (name:string, photoUrl: string): ThunkAction<void, AppState, unknown, ProfileActions> => async (dispatch) => {
	try {
		await profileAPI.setProfile(name, photoUrl);
		dispatch(setAuthor(name));
		dispatch(setPhotoUrl(photoUrl));
	}catch (error){
		alert(error);
	}
};