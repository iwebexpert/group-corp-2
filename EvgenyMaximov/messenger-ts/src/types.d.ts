type MessageType = {
	text: string,
	author: string,
	id: string,
	time: string,
	chatId: number,
};

type ChatType = {
	title: string,
   chatId: number,
	messages: MessageType[],
   fire: boolean,
   id: number,
};

type ProfileType = {
	firstName: string,
   secondName: string,
   age: number| undefined,
   nickName: string,
};