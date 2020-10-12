import React, {useCallback, useEffect, useRef, useState} from 'react';
import routesPaths from "../../configs/routesPaths";
import useAuthCheck from "../../utils/useAuthCheck";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {DbWorker} from "../../utils/DbWorker";
import {push} from 'connected-react-router';
import {useDispatch} from "react-redux";
import {setLoading} from "../../redux/actions";

export default () => {
    const dispatch = useDispatch();
    useAuthCheck(routesPaths.MESSENGER);
    const sigInBtnRef = useRef();
    const formRef = useRef();
    const signInHandler = useCallback(async (e) => {
            const formData = formRef.current.elements;
            dispatch(setLoading(true));
            disableBtn(sigInBtnRef.current);
            await DbWorker.auth(formData);
            activateBtn(sigInBtnRef.current);
            dispatch(setLoading(false));
    },[]);
    return (
        <div className={'AuthContainer'}>
            <form ref={formRef} className={'AuthArea'}>
                <div className="AuthAreaSection">
                    <label className={'AuthLabel'} htmlFor={'authEmail'}>Почта</label>
                    <input className={'AuthInput'} name={'authEmail'} id={'authEmail'} type={'text'} placeholder={'Почта'}/>
                    <label className={'AuthLabel'} htmlFor={'authPassword'}>Пароль</label>
                    <input className={'AuthInput'} name={'authPassword'} id={'authPassword'} type={'password'} placeholder={'Пароль'}/>
                    <div ref={sigInBtnRef} onClick={signInHandler} className={'button'}>Войти</div>
                    <div className={'Link'} onClick={() => dispatch(push(routesPaths.REGISTER))}>Регистрация</div>
                </div>
            </form>
        </div>
    );
}
