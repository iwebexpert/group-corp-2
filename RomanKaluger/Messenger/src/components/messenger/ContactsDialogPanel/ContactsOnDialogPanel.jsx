import React, { useCallback, useRef} from "react";
import { useSelector } from "react-redux";
import UserSelector from "./UserSelector";
import List from "@material-ui/core/List";
import {userTypes} from "./userTypes";

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
                    friends.length ? <List>{users.map(u => <UserSelector key={u._id} type={userTypes.FRIEND} user={u}/>)}</List> : 'Друзей нет'
                }

            </div>
            {
                others.length ?
                    <div className={'ChatsSectionDlgPn'}>
                        <div className={'ChatsSectionHeaderDlgPn'}>
                            Поиск
                        </div>
                        <List>
                        {others.map(u => <UserSelector clearInput={clearInput} key={u._id}  type={userTypes.OTHER} user={u}/>)}
                        </List>
                    </div>
                    : null
            }
        </>
    );
};
