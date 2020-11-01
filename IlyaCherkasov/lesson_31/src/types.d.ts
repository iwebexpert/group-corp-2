type NewChatType = {
    title: string;
    fire: boolean;
    messages: [];
}

type NewProfileType = {
    author: string;
    age: string;
}

type ChatListid = {
    id: string;
}

type MessagesType = {
    author: string;
    text: string;
    user: string;
    id?: string;
    chatId?: string;
};

type ChatsType = {
    id: number;
    title: string;
    messages: Array<MessagesType>;
    fire: boolean;
};

type ProfileType = {
    author: string;
    age: string;
}

type DefaultProfileRootState = {
    profile: {
        profileEntries: ProfileType;
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

//Components & Containers
type MessageFormComponentType = {
    classN?: string;
    handleKeyDown?: (event: React.KeyboardEvent) => void;
    text?: string;
    author?: string;
    chatID?: string;
    setText?: (text: string) => void;
    handleSetMessage?: () => void;
};

type ChatListComponentType = {
    isError?: boolean;
    isLoading?: boolean;
    chats?: ChatsType[];
    handlerReloadChat?: () => void;
    fireChat?: (chat: ChatsType, id: number) => string | undefined;
    handlerDeleteChat?: (e: any) => void;
    newChatField?: string;
    setNewChatField?: (e: string) => any;
    sendNewChat?: () => void;
    urlChatIconActive?: string;
    urlChatIconNewMessage?: string;
    urlChatIconNotActive?: string;
    handlerReloadChat?: () => void;
};

type MessageComponentType = {
    text: string;
    author: string;
    user: string;
}

type MessengerContainerType = {
    messages: MessagesType[] | null;
}

type ProfilePageType = {
    isLoading?: boolean;
    isError?: boolean;
    author?: string;
    profile?: ProfileType;
    age?: string;
    submitProfile?: () => void;
    setAge?: (age: string) => void;
    setAuthor?: (author: string) => void;
    handlerProfileRepeat?: () => void;
}