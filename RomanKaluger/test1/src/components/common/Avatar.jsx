import React, {useEffect, useState} from "react";
import {openUserProfile} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../utils/DbWorker";

export const AvatarUser = ({user, classType,needFind}) => {
    const [downLoadUser, setDownLoadUser] = useState(null);
    user = downLoadUser || user;
    const dispatch = useDispatch();
    const showUser = (e) => {
        e.stopPropagation();
        const avatarId = e.target.dataset.avatarId;
        if (avatarId && user) {
            dispatch(openUserProfile(user));
        }
    };
    useEffect(() => {
        let cleanupFunction = false;
        async function f(){
            const user = await DbWorker.getUserIdRange(needFind);
            if(!cleanupFunction) setDownLoadUser(user[0]);
        }
        if (!user && needFind){
            f();
        }
        return () => cleanupFunction = true;
    }, [needFind, user]);
    const avId = user
        ? user._id
        : needFind
            ? needFind
            : null;
    return (
        <div onClick={showUser} data-avatar-id={avId} className={classType}>
            {user
                ? user.avatarUrl
                    ? <img data-avatar-id={avId} src={user.avatarUrl}/>
                    : user.name.slice(0, 2)
                : '?'
            }
        </div>
    );
};
