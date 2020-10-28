import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {About} from '../pages/About';


import {aboutLoadAction} from '../actions/about';

export const AboutContainer = (props) => {

    const [infoPerson, isLoading] = useSelector((state) => [state.about.entries, state.about.loading]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!infoPerson) dispatch(aboutLoadAction());
    }, []);

    
    return <About infoPerson={infoPerson} isLoading={isLoading} />
    
}