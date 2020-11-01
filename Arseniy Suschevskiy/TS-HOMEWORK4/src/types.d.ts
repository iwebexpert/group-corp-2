type RootState = {
    chats: ChatsReducerState
    profile: ProfileReducerState
    [propName: string]: any,
}

type ChatsReducerState = {
    chatsList: ChatType[]
    loading: boolean
    chatLoading: boolean
    messageLoading: boolean
}

type ProfileReducerState = {
    profileInfo: profileInfoType,
    loading: boolean,
    error: boolean,
}

type profileInfoType = {
    id: number
    age: number
    name: string
    email: string
}

type chatType = {
    fire: boolean
    id?: number
    messages: messageTypeSuccess[]
    title: string
}
type messageTypeRequest = {
    text: string
    author: string
    id?: string | number
}

type messageTypeSuccess = {
    text: string
    author: string
    id: string | number
    chatId: number
}

