import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Header} from '../components/Header';
import {aboutLoadAction} from '../actions/about';


export const HeaderContainer = (props) => {

    const infoPerson = useSelector((state) => state.about.entries);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!infoPerson.name) {
            dispatch(aboutLoadAction());
        }
    }, []);

    
    return( <Header infoPerson={infoPerson}/>)
    
}