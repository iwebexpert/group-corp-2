import {messageTypes} from "../configs/statuses";

interface IUser {
    email: string;
    name: string;
    subscriptions: string[];
    subscribers: string[];
    _id: string;
    age: number;
    sex: string;
    avatarUrl: string;
    country: string;
    city: string;
    familyStatus: string;
    token: string;
}

interface IChat {
    title: string;
    members: string[];
    owner: string;
    messages: string[];
    sharedId: string;
    type: string;
    creator: string;
    _id: string;
    unReadCount?: number;
    lastMessage?: IMessage;
    activeMessages?: IMessage[];
}

interface IContacts {
    friends: IUser[],
    subscriptions: IUser[],
    subscribers: IUser[],
    others: IUser[]
}

interface IMessage {
    isPending?: boolean;
    _id: string;
    isRead?: boolean;
    text: string;
    whoRead: string[];
    dateSend: number;
    dateDelivered?: number;
    dateRead?: number;
    author: string;
    authorName: string;
    isForward: boolean;
    type: messageTypes;
    content: string[] | string | null;
    forwardMessages: IMessage[] | null;
}

interface IRegisterData {
    email: string;
    name: string;
    password: string;
    age: string;
    sex: string;
    avatarUrl: string;
    city: string;
    country: string;
    familyStatus: string;
}

type IUpdateData = Omit<IRegisterData, 'email' | 'password'>

interface IAuthData {
    email: string;
    password: string;
}
