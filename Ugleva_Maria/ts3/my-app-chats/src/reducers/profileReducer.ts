import {Reducer} from 'redux';
import {profileLoadAction, ProfileActionsType} from '../actions/profileAction';

export type ProfileReducerState = {
  entries: any;
  loading: boolean;
};
const initialState: ProfileReducerState = {
	entries: {},
	loading: false,
};
const profileReducer : Reducer<ProfileReducerState, profileLoadAction>= (state = initialState, action) => {
	switch (action.type) {
		case ProfileActionsType.PROFILE_LOAD:
        return {
          entries: action.profile[0],
          loading: false
        };
			
		default:
			return state;
  }
}
export default profileReducer;
