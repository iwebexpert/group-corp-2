const ADD_MESSAGE = 'ADD-MESSAGE'

const store = {
	_state: {
		messages: [
			{author: 'Alex', message: 'Hi, I`m learning React!'},
			{author: 'Sasha', message: 'I`m too'},
			{author: 'Alex', message: 'And what you think about it?'},
			{author: 'Sasha', message: 'Sometimes it`s hard'},
			{author: 'Alex', message: 'Me 2'},
		]
	},

	getState(){
		return this._state
	},

	dispatch(action){
		switch (action.type){
			case ADD_MESSAGE:{
				this._state.messages.push({author: 'new', message: action.message});
				this.rerenderTree();
			}
		}
	},

	rerenderTree(){},

	subscribe(observer){
		this.rerenderTree = observer;
	}
}

export const addMessage = (message) => {
	return {
		type: ADD_MESSAGE,
		message
	};
}

export default store;