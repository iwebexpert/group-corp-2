import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../utils/DbWorker";
import connectionConfig from "../../configs/connectionConfig";
import {openConversationManager, openUserProfile} from "../../redux/actions";
import {AvatarUser} from "../common/Avatar";
import {avatarSizeCls, chatTypes} from "../../configs/statuses";


export default ({chat}) => {
    const {curUser} = useSelector(s => s.app);
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        let cleanupFunction = false;
        if (chat) {
            const getMembers = async (membersIds, setMembers, curUser) => {
                const membersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/idrange/${membersIds.join('-')}`, curUser);
                const members = await membersRes.json();
                if (!cleanupFunction) setMembers(members);
            };
            getMembers(chat.members, setMembers, curUser);
        } else {
            setMembers([]);
        }
        return () => cleanupFunction = true;
    }, [chat]);
    const showUserProfile = useCallback((e) => {
        const el = e.target.closest('.avatar');
        if (!el) {
            return;
        }
        const id = el.dataset.memberId;
        if (id && members.length) {
            dispatch(openUserProfile(id === curUser._id ? curUser : members.find(x => x._id === id)));
        }
    }, [members]);
    return (
        <div onClick={showUserProfile} className={'MessengerTopPanel'}>
            {
                chat
                    ?
                    <>
                        {
                            chat.type === chatTypes.conversation
                                ? curUser && chat.members.includes(curUser._id)
                                ? <div onClick={() => dispatch(openConversationManager(true))}
                                       className="button">Управлять</div>
                                : <div className="infoText">Вы не состоите в беседе</div>
                                : null
                        }
                        {
                            members.length ?
                                members.map(x => <AvatarUser key={x._id} user={x} classType={avatarSizeCls.normal}/>)
                                : null
                        }
                        <div className={'chatTitleTopPn'}>Чат: {chat.title}</div>
                    </>
                    : <div className={'chatTitleTopPn'}>Чат не выбран</div>
            }
        </div>
    );
}
