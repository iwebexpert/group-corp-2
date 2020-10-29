import {profileAPI} from '../api/profileAPI';

const SET_AUTHOR = 'SET_AUTHOR';
const SET_PHOTO_URL = 'SET_PHOTO_URL';

let initialState = {
	author: '',
	photoUrl: ''
};

const ProfileReducer = (state = initialState, action) => {
	switch (action.type){
		case SET_AUTHOR: {
			return {
				...state,
				author: action.author
			};
		}
		case SET_PHOTO_URL: {
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

export const setAuthor = (author) => {
	return {
		type: SET_AUTHOR,
		author
	};
};

export const setPhotoUrl = (url) => {
	return {
		type: SET_PHOTO_URL,
		url
	};
};

export const getProfileThunk = () => async (dispatch) => {
	let response = await profileAPI.getProfile();
	const {name, photoUrl} = response;
	dispatch(setAuthor(name));
	dispatch(setPhotoUrl(photoUrl));
};

export const setProfileThunk = (name, photoUrl) => async (dispatch) => {
	try {
		await profileAPI.setProfile(name, photoUrl);
		dispatch(setAuthor(name));
		dispatch(setPhotoUrl(photoUrl));
	}catch (error){
		alert(error);
	}
};

export default ProfileReducer;