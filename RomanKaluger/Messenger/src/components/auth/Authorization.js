import React from 'react';
import {NavLink} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";

export default () => {
    return (
        <div className={'AuthContainer'}>
            <form className={'AuthArea'}>
                <label className={'AuthLabel'} htmlFor={'authEmail'}>Почта</label>
                <input className={'AuthInput'} name={'authEmail'} id={'authEmail'} type={'text'} placeholder={'Почта'}/>
                <label className={'AuthLabel'} htmlFor={'authPassword'}>Пароль</label>
                <input className={'AuthInput'} name={'authPassword'} id={'authPassword'} type={'password'} placeholder={'Пароль'}/>
                <div className={'button'}>Войти</div>
                <NavLink to={routesPaths.REGISTER} >Регистрация</NavLink>
            </form>
        </div>
    );
}
