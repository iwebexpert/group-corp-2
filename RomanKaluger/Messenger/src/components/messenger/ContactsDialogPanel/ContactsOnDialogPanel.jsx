import React, { useCallback, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserSelector from "./UserSelector";
import List from "@material-ui/core/List";
import {userTypes} from "./userTypes";
import {openUserProfile} from "../../../redux/actions";
import {categorizeUser} from "../../../utils/helpers";

export default ({clearInput}) => {
    const {curUser, contacts} = useSelector(s => s.app);
    const {friends, subscribers, subscriptions, others} = contacts;
    const dispatch = useDispatch();
    const openUserInfo = (e) => {
        const el = e.target.closest('.chatSelector');
        if (!el){
            return;
        }
        const id = el.id;
        if (!id) {
            return;
        }
            const usr = [].concat(...Object.values(contacts)).find(x => x._id === id);
            if (usr){
                dispatch(openUserProfile(usr));
            }
    };
    return(
        <>
            {
                others.length ?
                    <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                        <div className={'ChatsSectionHeaderDlgPn'}>
                            Поиск
                        </div>
                        <List>
                        {others.map(u => <UserSelector clearInput={clearInput} key={u._id}  type={categorizeUser(u, curUser)} user={u}/>)}
                        </List>
                    </div>
                    :
                    <>
                        <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                            <div className={'ChatsSectionHeaderDlgPn'}>
                                Друзья
                            </div>
                            {
                                friends.length ? <List>{friends.map(u => <UserSelector clearInput={clearInput} key={u._id} type={userTypes.FRIEND} user={u}/>)}</List> : 'Друзей нет'
                            }
                        </div>
                        <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                            <div className={'ChatsSectionHeaderDlgPn'}>
                                Подписки
                            </div>
                            {
                                subscriptions.length ? <List>{subscriptions.map(u => <UserSelector clearInput={clearInput} key={u._id} type={userTypes.SUBSCRIPTIONS} user={u}/>)}</List> : 'Подписок нет'
                            }
                        </div>
                        <div onClick={openUserInfo} className={'ChatsSectionDlgPn'}>
                            <div className={'ChatsSectionHeaderDlgPn'}>
                                Подписчики
                            </div>
                            {
                                subscribers.length ? <List>{subscribers.map(u => <UserSelector clearInput={clearInput} key={u._id} type={userTypes.SUBSCRIBERS} user={u}/>)}</List> : 'Подписчиков нет'
                            }
                        </div>
                    </>
            }
        </>
    );
};
