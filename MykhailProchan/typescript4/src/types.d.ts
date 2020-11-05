type MessageType = {
    text: string
    author: string
}

type ChatType = {
    id: number,
    name: string,
    fire: boolean,
}

interface CallHistoryMethodAction<A = any[]> {
    type: typeof CALL_HISTORY_METHOD;
    payload: LocationActionPayload<A>;
}

type ProfileType = {
    email: string
    id: number
    name: string
}