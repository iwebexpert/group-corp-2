const activeChatReducer = (state = '', action) => {
	switch (action.type) {
		case 'UPDATE_ACTIVE_CHAT':
			return action.id;			
		default:
			return state;
	}
};
export default activeChatReducer;
