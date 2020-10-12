const allChatsReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_MESSAGE_TO_CHAT':
			const copyState = state.map((item) => JSON.parse(JSON.stringify(item)));
			const newMessage = action.data;
			const chatToChange = copyState.find((item) => item.id === action.id);
			chatToChange.messages = chatToChange.messages.concat(newMessage);
			return copyState;
		case 'ADD_CHATS_TO_STATE':
			return action.data;
		case 'ADD_NEW_CHAT':
			const addCopyState = state.map((item) => JSON.parse(JSON.stringify(item)));
			addCopyState.push(action.data);
			return addCopyState;
		case 'HIGHLIGHT_CHAT':
      const copyStateHighlight = state.map((item) => JSON.parse(JSON.stringify(item)));
      const chatHighlight = copyStateHighlight.find((item) => item.id === action.chatId);
      chatHighlight.highlight = !chatHighlight.highlight;
			return copyStateHighlight;
		default:
			return state;
	}
};

export default allChatsReducer;
