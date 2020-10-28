export enum wsStatus{
    CLOSED = 'CLOSED',
    OPENED = 'OPENED'
}
export const PAGE_CURRENT = 'PAGE_CURRENT';
export enum messageTypes{
    TEXT = 'TEXT',
    AUDIO = 'AUDIO',
    IMAGE = 'IMAGE',
    SYSTEM_TEXT_PUBLIC = 'SYSTEM_TEXT_PUBLIC',
    SYSTEM_TEXT_PRIVATE = 'SYSTEM_TEXT_PRIVATE',
    SYSTEM_TEXT_INNER = 'SYSTEM_TEXT_INNER'

}
export enum systemMessages{
    SYSTEM_TEXT_PUBLIC = 'SYSTEM_TEXT_PUBLIC',
    SYSTEM_TEXT_PRIVATE = 'SYSTEM_TEXT_PRIVATE',
    SYSTEM_TEXT_INNER = 'SYSTEM_TEXT_INNER'
}
export enum chatTypes{
    DIALOG = 'DIALOG',
    CONVERSATION = 'CONVERSATION'
}
export enum avatarSizeCls{
    Normal = 'avatar',
    Big = 'avatarBig',
    Absolute = 'avatarAbsolute'
}
export enum changeChatTypes{
    Create = 'CREATE',
    DeleteUser ='DELETE_USER',
    AddUser ='ADD_USER',
    Rename = 'RENAME'
}
