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

export const ConversationManager = ({chat}) => {
    const {curUser, contacts} = useSelector(s => s.app);
    const [inviteMode, setInviteMode] = useState(false);
    const [newMembers, setNewMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const {conversationManagerOpen} = useSelector(s => s.system);
    const [title, setTitle] = useState(chat.title);
    const dispatch = useDispatch();
    const possibleMembers = useMemo(() => contacts.friends.filter(x => !chat.members.includes(x._id)), [chat, curUser, contacts]);
    const selectMembers = (e) => {
        const memberId = e.target.dataset.newMemberId;
        if (memberId) {
            const newMembersCand = newMembers.includes(memberId) ? newMembers.filter(x => x !== memberId) : [...newMembers, memberId];
            setNewMembers(newMembersCand);
        }
    };
    useEffect(() => {
        let cleanupFunction = false;
        async function f() {
            const members = await DbWorker.getUserIdRange(chat.members.join('-'));
            if (!cleanupFunction) setMembers(members);
        }
        f();
        return () => cleanupFunction = true;
    }, [chat]);
    const addMembers = () => {
        dispatch(changeChatData({
            sharedChatId: chat.sharedId,
            newParams: {
                members: [...chat.members, ...newMembers],
            },
            typeChange: changeChatTypes.addUser,
            signalPayload: newMembers
        }));
        setInviteMode(p => !p);
        setNewMembers([]);
    };
    const dropMember = (e) => {
        const deleteId = e.target.dataset.dropMemberId;
        if (deleteId) {
            dispatch(changeChatData({
                sharedChatId: chat.sharedId,
                newParams: {
                    members: chat.members.filter(x => x !== deleteId),
                },
                typeChange: changeChatTypes.deleteUser,
                signalPayload: deleteId
            }));
        }
    };
    const titleField = useRef();
    const onChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
        if (!e.target.value) {
            titleField.current.style.border = '2px solid red';
        } else {
            titleField.current.style.border = '2px solid transparent';
        }
    }, []);
    const onTitlePushData =() => {
        if (title) {
            dispatch(changeChatData({
                sharedChatId: chat.sharedId,
                newParams: {title},
                typeChange: changeChatTypes.rename,
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
                                        {possibleMembers.map(fr =>
                                            <div key={fr._id} data-new-member-id={fr._id}
                                                 className={classNames('chatSelector', {chatSelectorSelected: newMembers.includes(fr._id)})}>
                                                <div className="groupInfoChatSelector">
                                                    <AvatarUser user={fr} classType={avatarSizeCls.big}/>
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
                                        {members.map(fr =>
                                            <div key={fr._id} data-new-member-id={fr._id}
                                                 className={classNames('chatSelector', {chatSelectorSelected: newMembers.includes(fr._id)})}>
                                                <div className="groupInfoChatSelector">
                                                    <AvatarUser user={fr} classType={avatarSizeCls.big}/>
                                                    <div className={'chatSelectorTitle'}>
                                                        {fr.name}
                                                        {
                                                            chat.creator === fr._id ? '(Создатель)' : ''
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    fr._id === curUser._id
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
                        inviteMode ? null : <div onClick={() => dispatch(openConversationManager(false))}
                                                 className="button">Закрыть</div>
                    }
                    <div onClick={() => setInviteMode(p => !p)}
                         className="button">{inviteMode ? 'Отмена' : 'Пригласить'}</div>
                </div>
                <CloseWindow actionClose={() => dispatch(openConversationManager(false))}/>
            </form>
        </Backdrop>


    );
};
