import React from 'react';
import {Paper} from '@material-ui/core';
import './About.css';

import {InfoPersonType} from '../types/types';

type AboutType = {
    infoPerson: InfoPersonType;
    isLoading: boolean;
};

export const About: React.FC<AboutType> = ({infoPerson, isLoading }) => {

    if(isLoading){
        return(<div>ЗАгрузка</div>)
    }
    return (
        (infoPerson) ? 
            (<div className={"about"}>  
                <Paper elevation={3} className={"avatar"}>
                </Paper>
                <Paper elevation={3} style={{width: "56%",height: "80%"}}>
                    <div className={'infoUser'}> 
                        <h1>Логин: {infoPerson.name}</h1>
                        <h1>Возраст: {infoPerson.age}</h1>
                        <h1>Город: {infoPerson.city}</h1>
                        <h1>Главный чат: {infoPerson.mainChat}</h1>

                    </div>
                </Paper>
            </div>) : <div>Данные не загрузились</div>
    );
}

