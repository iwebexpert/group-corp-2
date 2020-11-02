import { FC } from "react";
import { WebStorage } from "redux-persist";

type NewChatType = {
    title: string;
};

type ChatFormType = {
    onSend: (chat: NewChatType) => void;
};

type ChatType = {
    id: number;
    title: string;
    messages: Array<MessagesType>;
    fire: boolean;
};

type ChatListType = {
    handleDeleteChat: (id: number) => void;
    items: Array<ChatType>;

};

type MessagesType = {
    author: string;
    text: string;
    id?: string;
    chatId?: number;
};

type MessageType = {
    text: string;
    author: string;
    handleDeleteMessage: (id: string) => void;
    message: MessagesType;
};

type ProfileType = {
    age: number;
    id: number;
    lastVisit: string;
    name: string;
    nickname: string;
    tel: string;
};

type HeaderType = {
    profile: ProfileType;
    isError: boolean;
    isLoading: boolean;
};

type MessageFormType = {
    onSend: (message: MessagesType) => void;
};

type MessagesListType = {
    handleDeleteMessage: (id: string) => void;
    items: Array<MessagesType>;
};

type MessengerType = {
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

type ProfileCardType = {
    profile: ProfileType;
    isError: boolean;
    isLoading: boolean;
    handleProfileReload: () => void;
};

type DefaultRootState = {
    profile: {
        entries: ProfileType;
        loading: boolean;
        error: boolean;
    }
};

type DefaultChatsRootState = {
    chats: {
        entries: ChatType[];
        loading: boolean;
        error: boolean;
    };
};

type ParamTypes = {
    id: string;
};

type ActionType = {
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

type RoutesFuncType = {
    path: string;
    exact: boolean;
    component: FC<{}>;
};

type PersistConfigType = {
    key: string;
    storage: WebStorage;
    blacklist: string[];
};

type ActionProfileType = {
    type: string;
    payload: ProfileType;
};

type InitailProfileStateType = {
    entries: {} | ProfileType[];
    loading: boolean;
    error: boolean;
};

type InitialMessagesType = {
    entries: {} | MessagesType[];
    loading: boolean;
    error: boolean;
};

type ActionMessagesType = {
    type: string;
    payload: MessagesType;
};

type InitialChatStateType = {
    entries: {} | ChatType[];
    loading: boolean;
    error: boolean;
};

type ActionChatType = {
    type: string;
    payload: number;
};

type NewMessageActionType = {
    type: string;
};

type UseStyleTypes = Record<"root" | "bullet" | "title" | "pos", string>;

type StyleTypes = (props?: string) => UseStyleTypes;