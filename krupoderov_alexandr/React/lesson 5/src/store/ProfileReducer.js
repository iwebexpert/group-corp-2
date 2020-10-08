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

export default ProfileReducer;