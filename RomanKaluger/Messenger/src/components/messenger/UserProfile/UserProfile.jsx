import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MyUserProfile from "./MyUserProfile";
import OtherUserProfile from "./OtherUserProfile";
import './UserProfile.scss'
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {openUserProfile} from "../../../redux/actions";

export default function () {
    const {userProfileToShow, curUser,contacts} = useSelector(s => s.app);
    useEffect(() => {
        if (userProfileToShow){
            const allUsers = Object.values(contacts).flat();
            if (!allUsers.includes(userProfileToShow)){
                dispatch(openUserProfile(allUsers.find(x => x._id === userProfileToShow._id)));
            }
        }
    },[contacts]);
    const dispatch = useDispatch();
    return (
        <>
        {
            userProfileToShow ?
                    <Backdrop open={!!userProfileToShow}>
                        <ClickAwayListener onClickAway={() => dispatch(openUserProfile(null))}>
                        <div>
                            {
                                userProfileToShow === curUser
                                    ? <MyUserProfile user={userProfileToShow}/>
                                    : <OtherUserProfile user={userProfileToShow}/>
                            }
                        </div>
                        </ClickAwayListener>
                    </Backdrop>
                : null
        }
        </>
    );
}
