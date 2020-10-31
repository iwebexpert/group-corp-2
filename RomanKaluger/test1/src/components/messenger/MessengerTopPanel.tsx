import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../utils/DbWorker";
import connectionConfig from "../../configs/connectionConfig";
import {openConversationManager, openUserProfile} from "../../redux/actions";
import {AvatarUser} from "../common/Avatar";
import {avatarSizeCls, chatTypes} from "../../configs/statuses";
import {IChat, IUser} from "../../types/globalTypes";
import {IAppState, ICombinedState} from "../../redux/reduxTypes/rdx";
import {Dispatch} from "redux";

type propTypes = {
    chat: IChat | null
};
const MessengerTopPanel: React.FC<propTypes> = ({chat}) => {
    const {curUser} = useSelector<ICombinedState, IAppState>(s => s.app);
    const [members, setMembers] = useState<IUser[]>([]);
    const dispatch: Dispatch = useDispatch();
    useEffect((): () => void => {
        let cleanupFunction: boolean = false;
        if (chat && curUser) {
            const getMembers = async (membersIds: string[], setMembers: React.Dispatch<React.SetStateAction<IUser[]>>, curUser: IUser): Promise<void> => {
                const membersRes: Response = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/idrange/${membersIds.join('-')}`, curUser);
                const members: IUser[] = await membersRes.json();
                if (!cleanupFunction) setMembers(members);
            };
            getMembers(chat.members, setMembers, curUser);
        } else {
            setMembers([]);
        }
        return (): void => {
            cleanupFunction = true
        };
    }, [chat]);
    const showUserProfile = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
        const el: HTMLDivElement | null = (e.target as HTMLDivElement).closest('.avatar');
        if (!el) {
            return;
        }
        const id: string | undefined = el.dataset.memberId;
        if (id && members.length) {
            const usr: IUser | undefined = members.find((x: IUser): boolean => x._id === id);
            dispatch(openUserProfile(curUser && id === curUser._id ? curUser : usr ?? null));
        }
    }, [members]);
    return (
        <div onClick={showUserProfile} className={'MessengerTopPanel'}>
            {
                chat
                    ?
                    <>
                        {
                            chat.type === chatTypes.CONVERSATION
                                ? curUser && chat.members.includes(curUser._id)
                                ? <div onClick={(): void => {
                                    dispatch(openConversationManager(true))
                                }}
                                       className="button">Управлять</div>
                                : <div className="infoText">Вы не состоите в беседе</div>
                                : null
                        }
                        {
                            members.length ?
                                members.map((x: IUser): React.ReactNode => <AvatarUser key={x._id} user={x}
                                                                                       classType={avatarSizeCls.Normal}/>)
                                : null
                        }
                        <div className={'chatTitleTopPn'}>Чат: {chat.title}</div>
                    </>
                    : <div className={'chatTitleTopPn'}>Чат не выбран</div>
            }
        </div>
    );
};
export default MessengerTopPanel;
