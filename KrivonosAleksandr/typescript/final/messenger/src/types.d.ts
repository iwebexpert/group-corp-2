type profilePayload = {
    id: number;
    name: string;
    birthDate: string;
    city: string;
    education: string;
    webSite: string;
    friends: number;
    subscribers: number;
    photos: number;
    marks: number;
    videos: number;
}

type chatsPayload = {
    id: string;
    name: string;
    lastMessage: string[] | undefined;
    answerCount: number;
    fire: boolean;
    userName: string;
    botMessages: string[];
    messages?: string[];
}

type newDialog = {
    id: string;
    name: string;
}

type DialogItemCheckTypes = {
    friendsList: friendsPayload[];
    onAddDialog: (dialog: newDialog) => void
}

type messagePayload = {
    text: string;
    type: string;
    time: string;
    id: number;
    chatId: number;
}

type chatIdPayload = {
    chatId: number;
}

type friendsPayload = {
    id: string;
    name: string;
    filteredFriends?: [];
}

type MessageListProps = {
    msgType: string;
    msgText: string;
    msgTime: string;
    key: number;
}

type MsgObject = {
    msg: MessageListProps;
}