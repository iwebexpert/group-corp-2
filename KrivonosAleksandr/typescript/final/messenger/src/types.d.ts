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
    lastMessage: string;
    answerCount: number;
    fire: boolean;
    userName: string;
    botMessages: string[];
    messages?: messagePayload[];
}

type newDialog = {
    id: number;
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
    id: string;
    chatId: number;
    key?: string;
}

type chatIdPayload = {
    chatId: number;
}

type friendsPayload = {
    id: number;
    name: string;
    filteredFriends?: [];
}

// type MessageListProps = {
//     msgType: string;
//     msgText: string;
//     msgTime: string;
//     key: number;
// }

type MsgObject = {
    msg: MessageListProps;
}