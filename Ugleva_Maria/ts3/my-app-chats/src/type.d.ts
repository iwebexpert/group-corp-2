export type MessageType = {
    text: string;
    author: string;
    id: string;
    chatId: string;
  };
export type Styles = {
    [key: string] : string;
    [key: string] : {[key: string] : string;};
};
export type NewChatStructure = {
	id: string;
	title: string;
	highlight: boolean;
	avatar: string;
};