import { v4 as uuidv4 } from 'uuid';
import user from '../assets/img/user.png';

let initialState = {
	chats: [
		{id: uuidv4(), name: 'Alex', photoUrl: user},
		{id: uuidv4(), name: 'Sasha', photoUrl: user},
		{id: uuidv4(), name: 'Igor', photoUrl: user},
		{id: uuidv4(), name: 'Mary', photoUrl: user},
		{id: uuidv4(), name: 'BOOOOOOOR', photoUrl: user}, // FUCK THE POLICE
	]
}

export const ChatReducer = (state = initialState, action) => {
	switch (action.type){
		default: {
			return state;
		}
	}
};