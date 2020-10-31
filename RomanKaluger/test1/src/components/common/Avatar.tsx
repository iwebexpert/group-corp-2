import React, {useEffect, useState} from "react";
import {openUserProfile} from "../../redux/actions";
import {useDispatch} from "react-redux";
import {DbWorker} from "../../utils/DbWorker";
import {IUser} from "../../types/globalTypes";
import {avatarSizeCls} from "../../configs/statuses";
import {Dispatch} from "redux";

type propTypes = {
    user: IUser | null,
    classType: avatarSizeCls,
    needFind?: string | null
};
export const AvatarUser: React.FC<propTypes> = ({user, classType, needFind}) => {
    const [downLoadUser, setDownLoadUser] = useState<IUser | null>(null);
    user = downLoadUser || user;
    const dispatch: Dispatch = useDispatch();
    const showUser: React.MouseEventHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        const avatarId: string | undefined = (e.target as HTMLDivElement).dataset.avatarId;
        if (avatarId && user) {
            dispatch(openUserProfile(user));
        }
    };
    useEffect((): () => void => {
        let cleanupFunction: boolean = false;

        async function f(): Promise<void> {
            if (needFind) {
                const user: IUser[] = await DbWorker.getUserIdRange(needFind);
                if (!cleanupFunction) setDownLoadUser(user[0]);
            }
        }

        if (!user && needFind) {
            f();
        }
        return (): void => {
            cleanupFunction = true
        };
    }, [needFind, user]);
    const avId: string | null = user
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
