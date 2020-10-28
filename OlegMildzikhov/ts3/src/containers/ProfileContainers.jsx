import React, {useEffect} from 'react';
import {useDispatch,useSelector } from 'react-redux';
import {Profile} from '../components/Chats-profile/Profile';
import {profileLoadActions} from '../actions/profile';

export const ProfileContainer = (props) => {

    const profile = useSelector((state)=> state.profile.entries);
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-expressions
    useEffect(()=> {
        return dispatch(profileLoadActions());
    }), [];

    return(
        <Profile profile={profile}/>
    );
}
