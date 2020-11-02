import axios from 'axios';

export const chatsAPI = {
	getChats(){
		return axios.get('http://localhost:4000/chats?_embed=messages').then(response => response.data);
	},
	addChat(id: string, name: string, isFire: boolean, photoUrl: string){
		return axios.post('http://localhost:4000/chats', {id, name, isFire, photoUrl}).then(response => response);
	},
	deleteChat(id: number){
		return axios.delete(`http://localhost:4000/chats/${id}`).then(response => response);
	},
	sendMessage(chatId: string, author: string, text: string, isFire = false){
		return axios.post(`http://localhost:4000/chats/${chatId}/messages`, {chatId, author,text, isFire}).then(response => response);
	}
};
