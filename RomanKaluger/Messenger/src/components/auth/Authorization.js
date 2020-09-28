import React, {useCallback, useRef} from 'react';
import {NavLink} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";
import useAuthCheck from "../../utils/useAuthCheck";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {DbWorker} from "../../utils/DbWorker";

export default () => {
    useAuthCheck(routesPaths.MESSENGER);
    const sigInBtnRef = useRef();
    const formRef = useRef();
    const signInHandler = useCallback(async (e) => {
            const formData = formRef.current.elements;
            disableBtn(sigInBtnRef.current);
            await DbWorker.auth(formData);
            activateBtn(sigInBtnRef.current);
    },[]);
    return (
        <div className={'AuthContainer'}>
            <form ref={formRef} className={'AuthArea'}>
                <label className={'AuthLabel'} htmlFor={'authEmail'}>Почта</label>
                <input className={'AuthInput'} name={'authEmail'} id={'authEmail'} type={'text'} placeholder={'Почта'}/>
                <label className={'AuthLabel'} htmlFor={'authPassword'}>Пароль</label>
                <input className={'AuthInput'} name={'authPassword'} id={'authPassword'} type={'password'} placeholder={'Пароль'}/>
                <div ref={sigInBtnRef} onClick={signInHandler} className={'button'}>Войти</div>
                <NavLink to={routesPaths.REGISTER} >Регистрация</NavLink>
            </form>
        </div>
    );
}
