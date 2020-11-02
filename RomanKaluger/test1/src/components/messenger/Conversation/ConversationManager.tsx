import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField/TextField";
import classNames from 'classnames';
import './conversation.scss';
import {
    changeChatData,
    openConversationManager,
} from "../../../redux/actions";
import {CloseWindow} from "../../common/CloseWindow";
import {AvatarUser} from "../../common/Avatar";
import {avatarSizeCls, changeChatTypes} from "../../../configs/statuses";
import {DbWorker} from "../../../utils/DbWorker";
import {IChat, IUser} from "../../../types/globalTypes";
import {IAppState, ICombinedState, ISystemState} from "../../../redux/reduxTypes/rdx";
import {Dispatch} from "redux";

type propTypes = {
    chat: IChat
};
export const ConversationManager: React.FC<propTypes> = ({chat}) => {
    const {curUser, contacts} = useSelector<ICombinedState, IAppState>(s => s.app);
    const [inviteMode, setInviteMode] = useState<boolean>(false);
    const [newMembers, setNewMembers] = useState<string[]>([]);
    const [members, setMembers] = useState<IUser[]>([]);
    const {conversationManagerOpen} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const [title, setTitle] = useState<string>(chat.title);
    const dispatch: Dispatch = useDispatch();
    const possibleMembers: IUser[] = useMemo((): IUser[] => contacts.friends.filter((x: IUser): boolean => !chat.members.includes(x._id)), [chat, curUser, contacts]);
    const selectMembers: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
        const memberId: string | undefined = (e.target as HTMLDivElement).dataset.newMemberId;
        if (memberId) {
            const newMembersCand: string[] = newMembers.includes(memberId) ? newMembers.filter((x: string): boolean => x !== memberId) : [...newMembers, memberId];
            setNewMembers(newMembersCand);
        }
    };
    useEffect((): () => void => {
        let cleanupFunction: boolean = false;
        async function f(): Promise<void> {
            const members: IUser[] = await DbWorker.getUserIdRange(chat.members.join('-'));
            if (!cleanupFunction) setMembers(members);
        }
        f();
        return (): void => {
            cleanupFunction = true
        };
    }, [chat]);
    const addMembers: React.MouseEventHandler = (): void => {
        dispatch(changeChatData({
            sharedChatId: chat.sharedId,
            newParams: {
                members: [...chat.members, ...newMembers],
            },
            typeChange: changeChatTypes.AddUser,
            signalPayload: newMembers
        }));
        setInviteMode((p: boolean): boolean => !p);
        setNewMembers([]);
    };
    const dropMember: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement>): void => {
        const deleteId: string | undefined = (e.target as HTMLDivElement).dataset.dropMemberId;
        if (deleteId) {
            dispatch(changeChatData({
                sharedChatId: chat.sharedId,
                newParams: {
                    members: chat.members.filter((x: string): boolean => x !== deleteId),
                },
                typeChange: changeChatTypes.DeleteUser,
                signalPayload: deleteId
            }));
        }
    };
    const titleField: React.Ref<HTMLInputElement> = useRef(null);
    const onChangeTitle: React.ChangeEventHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!titleField.current) {
            return;
        }
        setTitle(e.target.value);
        if (!e.target.value) {
            titleField.current.style.border = '2px solid red';
        } else {
            titleField.current.style.border = '2px solid transparent';
        }
    }, []);
    const onTitlePushData: React.MouseEventHandler = (): void => {
        if (title) {
            dispatch(changeChatData({
                sharedChatId: chat.sharedId,
                newParams: {title},
                typeChange: changeChatTypes.Rename,
                signalPayload: title
            }));
        }
    };
    return (
        <Backdrop open={conversationManagerOpen}>
            <form name={'createConversationForm'} id={'createConversationForm'}
                  className={'manageConversationContainer'}>
                <div className={'primaryHeader'}>Управление беседой</div>
                <div className="titleContainer">
                    <TextField ref={titleField} name={'titleConversation'} label="Название" onChange={onChangeTitle}
                               value={title} variant="filled"/>
                    {
                        title === chat.title
                            ? null
                            : <div onClick={onTitlePushData} className="button">Ок</div>
                    }
                </div>
                {
                    inviteMode
                        ? <div onClick={selectMembers} className="memberSelectorContainer">
                            <div className={'secondaryHeader'}>Выберите новых участников</div>
                            {
                                possibleMembers.length
                                    ?
                                    <>
                                        {possibleMembers.map((fr: IUser): React.ReactNode =>
                                            <div key={fr._id} data-new-member-id={fr._id}
                                                 className={classNames('chatSelector', {chatSelectorSelected: newMembers.includes(fr._id)})}>
                                                <div className="groupInfoChatSelector">
                                                    <AvatarUser user={fr} classType={avatarSizeCls.Big}/>
                                                    <div className={'chatSelectorTitle'}>
                                                        {fr.name}
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                        <div onClick={addMembers}
                                             className={classNames("button", {disabled: !newMembers.length})}>Добавить
                                        </div>
                                    </>
                                    : <div className="NoteText">Вам больше некого приглашать</div>
                            }
                        </div>
                        :
                        <div onClick={dropMember} className="memberSelectorContainer">
                            <div className={'secondaryHeader'}>Участники</div>
                            {
                                members.length
                                    ?
                                    <>
                                        {members.map((fr: IUser): React.ReactNode =>
                                            <div key={fr._id} data-new-member-id={fr._id}
                                                 className={classNames('chatSelector', {chatSelectorSelected: newMembers.includes(fr._id)})}>
                                                <div className="groupInfoChatSelector">
                                                    <AvatarUser user={fr} classType={avatarSizeCls.Big}/>
                                                    <div className={'chatSelectorTitle'}>
                                                        {fr.name}
                                                        {
                                                            chat.creator === fr._id ? '(Создатель)' : ''
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    curUser && fr._id === curUser._id
                                                        ? <div className={'NoteContainer'}>
                                                            <div className="infoText">Вы</div>
                                                        </div>
                                                        : <div data-drop-member-id={fr._id} className="button">
                                                            Исключить
                                                        </div>
                                                }
                                            </div>
                                        )}
                                    </>
                                    : <div className="NoteText">Вам больше некого приглашать</div>
                            }
                        </div>
                }
                <div className="controlBtnsContainer">
                    {
                        inviteMode ? null : <div onClick={(): void => {
                            dispatch(openConversationManager(false))
                        }}
                                                 className="button">Закрыть</div>
                    }
                    <div onClick={(): void => setInviteMode((p: boolean): boolean => !p)}
                         className="button">{inviteMode ? 'Отмена' : 'Пригласить'}</div>
                </div>
                <CloseWindow actionClose={(): void => {
                    dispatch(openConversationManager(false))
                }}/>
            </form>
        </Backdrop>


    );
};
