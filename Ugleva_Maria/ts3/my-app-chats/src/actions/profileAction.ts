import { ActionCreator, Dispatch } from 'redux';
export enum ProfileActionsType {
	PROFILE_LOAD = 'PROFILE_LOAD',
};
type Profile = {
	id: number,
	name: string,
	email: string,
	surname: string,
	age: number,
	country: number,
	city: string,
	avatar: string,
}
export type profileLoadAction = {
	type: ProfileActionsType.PROFILE_LOAD;
	profile: Array<Profile>;
};
const profileLoadAction : ActionCreator<profileLoadAction> = (profile: Array<Profile>) => ({
  type: ProfileActionsType.PROFILE_LOAD,
  profile
});

export const fetchProfile = () => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await fetch('http://localhost:4000/profiles')
      if (await result.ok) dispatch(profileLoadAction(await result.json()));
		} catch (error) {
			console.log('Error');
		}
	};
};

export default fetchProfile;
