type MessageType = {
    text: string;
    author: string;
    id?: string;
    chatId?: string | number | undefined;
};

type NewChatType = {
    title: string;
};

type ChatType = {
    id: number;
    title: string;
    messages: Array<MessageType>;
    fire: boolean;
};

type ProfileType = {
    age: number;
    name: string;
    nickname: string;
    tel: string;
};

type ProfileCardType = {
    profile: ProfileType;
    isError: boolean;
    isLoading: boolean;
    handleProfilesReload: () => void;
};

type RoutesFuncType = {
    path: string;
    exact: boolean;
    component: FC<{}>;
};