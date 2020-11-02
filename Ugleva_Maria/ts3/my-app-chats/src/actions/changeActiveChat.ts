import { ActionCreator} from 'redux';

export enum ChahgeActionTypes {
    UPDATE_ACTIVE_CHAT = 'UPDATE_ACTIVE_CHAT',
};
export type setActiveChat = {
    type: ChahgeActionTypes.UPDATE_ACTIVE_CHAT;
    id: string;
}
export const setActiveChat : ActionCreator<setActiveChat> = (id: string) => ({
    type: ChahgeActionTypes.UPDATE_ACTIVE_CHAT,
    id: id
});