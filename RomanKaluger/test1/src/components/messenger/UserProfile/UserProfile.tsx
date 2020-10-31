import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MyUserProfile from "./MyUserProfile";
import OtherUserProfile from "./OtherUserProfile";
import './UserProfile.scss'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {openUserProfile} from "../../../redux/actions";
import {CloseWindow} from "../../common/CloseWindow";
import {IAppState, ICombinedState} from "../../../redux/reduxTypes/rdx";
import {IUser} from "../../../types/globalTypes";
import {Dispatch} from "redux";

const UserProfile = () => {
    const {userProfileToShow, curUser, contacts} = useSelector<ICombinedState, IAppState>(s => s.app);
    useEffect((): void => {
        if (userProfileToShow) {
            const allUsers: IUser[] = Object.values(contacts).flat();
            if (!allUsers.includes(userProfileToShow)) {
                const user: IUser | undefined = allUsers.find((x: IUser): boolean => x._id === userProfileToShow._id);
                dispatch(openUserProfile(user ?? null));
            }
        }
    }, [contacts]);
    const dispatch: Dispatch = useDispatch();
    return (
        <>
            {
                userProfileToShow ?
                    <Backdrop id={'UserProfile'} open={!!userProfileToShow}>
                        <ClickAwayListener onClickAway={(): void => {
                            dispatch(openUserProfile(null))
                        }}>
                            <div className={'userProfileContainer'}>
                                {
                                    userProfileToShow === curUser
                                        ? <MyUserProfile user={userProfileToShow}/>
                                        : <OtherUserProfile user={userProfileToShow}/>
                                }
                                <CloseWindow actionClose={(): void => {
                                    dispatch(openUserProfile(null))
                                }}/>
                            </div>
                        </ClickAwayListener>
                    </Backdrop>
                    : null
            }
        </>
    );
};
export default UserProfile;
