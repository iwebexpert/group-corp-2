import React, { useCallback, useRef} from "react";
import { useSelector } from "react-redux";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {DbWorker} from "../../utils/DbWorker";

const userTypes = {
    FRIEND: 'FRIEND',
    OTHER: 'OTHER'
};
function UserSelector({user, type, clearInput}) {
    const startChatRef = useRef();
    const startChatHandler = useCallback(async () => {
        clearInput();
        disableBtn(startChatRef.current);
        await DbWorker.createChat(user);
        activateBtn(startChatRef.current);
    }, [user]);
    return(
        <div className={'chatSelector'}>
            <div className={'chatSelectorTitle'}>
                {user.name}
            </div>
            <div className={'chatSelectorPeopleBtn'}>
               <div ref={startChatRef} onClick={startChatHandler} className={'startChatUserBtn'}/>
                {
                    type === userTypes.OTHER
                        ? <div className={'addFriendUserBtn'}/>
                        : null
                }
            </div>
        </div>
    );
}
export default ({users, clearInput}) => {
    const user = useSelector(s => s.app.curUser);
    const friends = [];
    const others = [];
    users.forEach(u => {
        if (user.friends.includes(u._id)){
            friends.push(u);
        } else {
            others.push(u);
        }
    });
    return(
        <>
            <div className={'ChatsSectionDlgPn'}>
                <div className={'ChatsSectionHeaderDlgPn'}>
                    Друзья
                </div>
                {
                    friends.length ? users.map(u => <UserSelector key={u._id} type={userTypes.FRIEND} user={u}/>) : 'Друзей нет'
                }
            </div>
            {
                others.length ?
                    <div className={'ChatsSectionDlgPn'}>
                        <div className={'ChatsSectionHeaderDlgPn'}>
                            Поиск
                        </div>
                        {others.map(u => <UserSelector clearInput={clearInput} key={u._id}  type={userTypes.OTHER} user={u}/>)}
                    </div>
                    : null
            }
        </>
    );
};
