import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Header} from '../components/Header';
import {aboutLoadAction} from '../actions/about';

import {AppState} from '../reducers';

export const HeaderContainer: React.FC = () => {

    const infoPerson = useSelector((state: AppState) => state.about.entries);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!infoPerson.name) {
            dispatch(aboutLoadAction());
        }
    }, []);

    return( <Header infoPerson={infoPerson}/>);
    
}