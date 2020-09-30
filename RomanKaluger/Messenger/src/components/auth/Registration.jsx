import React, {useCallback, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";
import {DbWorker} from "../../utils/DbWorker";
import {activateBtn, disableBtn} from "../../utils/helpers";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default () => {
    const [isLoad, setIsLoad] = useState(false);
    const signBtnRef = useRef();
    const formRef = useRef();
    const signHandler = useCallback(async (e) => {
           setIsLoad(true);
           const formData = formRef.current.elements;
           disableBtn(signBtnRef.current);
           await DbWorker.register(formData);
           activateBtn(signBtnRef.current);
           setIsLoad(false);
    },[]);
    return (
        <div className={'AuthContainer'}>
            <Backdrop open={isLoad}>
                <CircularProgress/>
            </Backdrop>
            <form ref={formRef} className={'AuthArea'}>
                <label className={'AuthLabel'} htmlFor={'regName'}>Имя</label>
                <input className={'AuthInput'} name={'regName'} id={'regName'} type={'text'} placeholder={'Имя'}/>
                <label className={'AuthLabel'} htmlFor={'regEmail'}>Почта</label>
                <input className={'AuthInput'} name={'regEmail'} id={'regEmail'} type={'text'} placeholder={'Почта'}/>
                <label className={'AuthLabel'} htmlFor={'regPassword'}>Пароль</label>
                <input className={'AuthInput'} name={'regPassword'} id={'regPassword'} type={'password'} placeholder={'Пароль'}/>
                <div ref={signBtnRef} onClick={signHandler} className={'button'}>Зарегистрироваться</div>
                <NavLink to={routesPaths.AUTH} >Авторизация</NavLink>
            </form>
        </div>
    );
}
