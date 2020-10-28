import { FC } from "react";
import { WebStorage } from "redux-persist";

export type NewChatType = {
    title: string;
};

export type ChatFormType = {
    onSend: (chat: NewChatType) => void;
};

export type ChatType = {
    id: number;
    title: string;
    messages: Array<MessagesType>;
    fire: boolean;
};

export type ChatListType = {
    handleDeleteChat: (id: number) => void;
    items: Array<ChatType>;

};

export type MessagesType = {
    author: string;
    text: string;
    id?: string;
    chatId?: number;
};

export type MessageType = {
    text: string;
    author: string;
    handleDeleteMessage: (id: string) => void;
    message: MessagesType;
};

export type ProfileType = {
    age: number;
    id: number;
    lastVisit: string;
    name: string;
    nickname: string;
    tel: string;
};

export type HeaderType = {
    profile: ProfileType;
    isError: boolean;
    isLoading: boolean;
};

export type MessageFormType = {
    onSend: (message: MessagesType) => void;
};

export type MessagesListType = {
    handleDeleteMessage: (id: string) => void;
    items: Array<MessagesType>;
};

export type MessengerType = {
    chats: ChatType[];
    messages: MessagesType[] | null;
    isLoading: boolean;
    isError: boolean;
    handleDeleteChat: (id: number) => void;
    handleDeleteMessage: (id: string) => void;
    handleMessageSend: (message: MessagesType) => void;
    handleNewChat: (chat: NewChatType) => void;
    handleChatsReload: () => void;
};

export type ProfileCardType = {
    profile: ProfileType;
    isError: boolean;
    isLoading: boolean;
    handleProfileReload: () => void;
};

export type DefaultRootState = {
    profile: {
        entries: ProfileType;
        loading: boolean;
        error: boolean;
    }
};

export type DefaultChatsRootState = {
    chats: {
        entries: ChatType[];
        loading: boolean;
        error: boolean;
    };
};

export type ParamTypes = {
    id: string;
};

export type ActionType = {
    type: string;
    loading: boolean;
    payload: {
        author: string;
        text: string;
        id: string;
        chatId: number;
        title: string;
    };
};

export type RoutesFuncType = {
    path: string;
    exact: boolean;
    component: FC<{}>;
};

export type PersistConfigType = {
    key: string;
    storage: WebStorage;
    blacklist: string[];
};

export type ActionProfileType = {
    type: string;
    payload: ProfileType;
};

export type InitailProfileStateType = {
    entries: {} | ProfileType[];
    loading: boolean;
    error: boolean;
};

export type InitialMessagesType = {
    entries: {} | MessagesType[];
    loading: boolean;
    error: boolean;
};

export type ActionMessagesType = {
    type: string;
    payload: MessagesType;
};

export type InitialChatStateType = {
    entries: {} | ChatType[];
    loading: boolean;
    error: boolean;
};

export type ActionChatType = {
    type: string;
    payload: number;
};

export type NewMessageActionType = {
    type: string;
};

export type UseStyleTypes = Record<"root" | "bullet" | "title" | "pos", string>;

export type StyleTypes = (props?: string) => UseStyleTypes;