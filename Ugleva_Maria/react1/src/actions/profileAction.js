const profileLoadAction = (profile) => ({
  type: "PROFILE_LOAD",
  profile
});

export const fetchProfile = () => {
	return async (dispatch) => {
		try {
			const result = await fetch('http://localhost:3000/profiles')
      if (await result.ok) dispatch(profileLoadAction(await result.json()));
		} catch (error) {
			console.log('Error');
		}
	};
};

export default fetchProfile;
