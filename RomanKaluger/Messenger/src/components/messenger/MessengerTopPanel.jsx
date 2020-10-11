import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../utils/DbWorker";
import connectionConfig from "../../configs/connectionConfig";
import {openUserProfile} from "../../redux/actions";

const getMembers = async (membersIds, setMembers, curUser) => {
    const membersRes = await DbWorker.authGet(`${connectionConfig.hostHttp}/users/idrange/${membersIds.join('-')}`, curUser);
    const members = await membersRes.json();
    setMembers(members);
};

export default ({chat}) => {
    const {curUser} = useSelector(s => s.app);
    const [members, setMembers] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (chat) {
            getMembers(chat.members, setMembers, curUser);
        } else {
            setMembers([]);
        }
    }, [chat]);
    const showUserProfile = useCallback((e)=>{
        const el = e.target.closest('.avatar');
        if (!el){
            return;
        }
        const id = el.dataset.memberId;
        if (id && members.length){
            dispatch(openUserProfile(id ===curUser._id ? curUser : members.find(x => x._id === id)));
        }
    },[members]);
    return (
        <div onClick={showUserProfile} className={'MessengerTopPanel'}>
            {
                members.length ?
                    members.map(x => <div key={x._id} data-member-id={x._id} className="avatar">
                        {x.avatarUrl ? <img src={x.avatarUrl} alt={'Аватар'}/> : x.name.slice(0, 2)}
                    </div>)
                    : null
            }
            <div className={'chatTitleTopPn'}>
                {
                    chat ? `Чат: ${chat.title}` : 'Чат не выбран'
                }
            </div>
        </div>
    );
}
