export type MessageType = {
    id?: number | string,
    author: string,
    photoUrl?: string,
    text: string,
};

export interface IChatType {
    id: string;
    name: string;
    photoUrl: string;
    isFire: boolean;
    messages: Array<MessageType>;
}