const initialState = {
	entries: {},
	loading: false,
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PROFILE_LOAD':
      console.log('profile', action.profile)
        return {
          entries: action.profile[0],
          loading: false
        };
			
		default:
			return state;
  }
}
export default profileReducer;
