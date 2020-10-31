export type InfoPersonType = {
    id: number;
    name: string;
    age: number;
    city: string;
    mainChat: string;
    avatar: string;
};

export type MessageType = {
    author: string;
    text: string;
};

export type MessageFullInfoType = MessageType & {
    id: number;
    chatId: number;
};

export type NewChatType = {
    author: string;
    avatar: string;
};

export type ChatType = NewChatType & {
    id: number;
};