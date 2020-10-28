import {Action} from "redux";
import {IAuthData, IChat, IContacts, IMessage, IRegisterData, IUser} from "../configs/globalTypes";
import {changeChatTypes, wsStatus} from "../configs/statuses";
import {loadChatMessages, setLoading} from "./actions";
import {IInputAuth, IInputReg, IInputUpdate} from "../utils/DbWorker";

export interface CommonAction extends Action {
    type: any;
    payload: any;
}
export interface CommonSignalAction extends Action {
    type: any;
}

export interface IChangeChatDataPayload {
    newParams: Partial<IChat>;
    sharedChatId: string;
    typeChange: changeChatTypes;
    signalPayload?: any;
}
export interface IChangeChatData extends CommonAction{
    payload: IChangeChatDataPayload;
}
export interface ISendMessage extends CommonAction{
    payload: Partial<IMessage> & {forwardMessages?: ISetFrowardMessagePayload};
}
export interface ICreateChat extends CommonAction{
    payload: Partial<IChat>;
}
export interface ILoadChatMessages extends CommonAction{
    payload: string;
}
export interface ISetLoading extends CommonAction{
    payload: boolean;
}
export interface ISetError extends CommonAction{
    payload: Partial<Error>;
}
export interface IChangeWsStatus extends CommonAction{
    payload: wsStatus;
}
export interface ISetCurrentUser extends CommonAction{
    payload: IUser | null;
}
export interface IOpenUserProfile extends CommonAction{
    payload: IUser | null;
}
export interface ISetSelectedChat extends CommonAction{
    payload: string;
}
export interface ISetChats extends CommonAction{
    payload: IChat[];
}
export interface ISetFrowardMessagePayload{
    messages: IMessage[];
    chat: null | IChat;
}
export interface ISetForwardMessage extends CommonAction{
    payload: ISetFrowardMessagePayload | null;
}
export interface ISetContacts extends CommonAction{
    payload: IContacts;
}
export interface ISetCommonViewImages extends CommonAction{
    payload: string[] | null;
}
export interface ILoadContacts extends CommonAction{
    payload: string;
}
export interface IAuth extends CommonAction{
    payload: IInputAuth;
}
export interface IRegister extends CommonAction{
    payload: IInputReg;
}
export interface IUpdateUserPayload {
    name: string;
    age: string;
    sex: string;
    avatarUrl: string;
    city: string;
    country: string;
    familyStatus: string;
}
export interface IUpdateUser extends CommonAction{
   payload: IInputUpdate;
}
export interface IDeleteChat extends CommonAction{
    payload: string;
}
export interface ISetAboutPageOpen extends CommonAction{
    payload: boolean;
}
export interface IOpenCreateConversation extends CommonAction{
    payload: boolean;
}
export interface IOpenConversationManager extends CommonAction{
    payload: boolean;
}
