import React from 'react';
import {useCallback} from 'react';
import {NavLink} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";
import {useSelector} from "react-redux";
import {wsStatuses} from "../../configs/statuses";
import connectionConfig from "../../configs/connectionConfig";

export default () => {
    const wsStatus = useSelector(s => s.app.wsStatus);
    const signInHandler = useCallback((e) => {
        if (wsStatus === wsStatuses.OPENED) {
            const formData = document.querySelector('.AuthArea').elements;
            connectionConfig.ws.send(JSON.stringify({
                type: wsTypes.REGISTER,
                body:{
                    email: formData.regEmail.value,
                    name: formData.regName.value,
                    password: formData.regPassword.value,
                }
            }));
        }
    },[wsStatus]);
    return (
        <div className={'AuthContainer'}>
            <form className={'AuthArea'}>
                <label className={'AuthLabel'} htmlFor={'regName'}>Имя</label>
                <input className={'AuthInput'} name={'regName'} id={'regName'} type={'text'} placeholder={'Имя'}/>
                <label className={'AuthLabel'} htmlFor={'regEmail'}>Почта</label>
                <input className={'AuthInput'} name={'regEmail'} id={'regEmail'} type={'text'} placeholder={'Почта'}/>
                <label className={'AuthLabel'} htmlFor={'regPassword'}>Пароль</label>
                <input className={'AuthInput'} name={'regPassword'} id={'regPassword'} type={'password'} placeholder={'Пароль'}/>
                <div onClick={() => signInHandler()} className={'button'}>Войти</div>
                <NavLink to={routesPaths.AUTH} >Авторизация</NavLink>
            </form>
        </div>
    );
}
