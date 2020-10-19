import React, {Component, useEffect} from 'react';
import { connect, useDispatch,useSelector } from 'react-redux';
import {Profile} from '../components/Chats-profile/Profile';
import {profileLoadActions} from '../actions/profile';

export const ProfileContainer = (props) => {

    const profile = useSelector((state)=> state.profile.entries);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(profileLoadActions());
    }), [];

    return(
        <Profile profile={profile}/>
    );
}
