import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";
import useAuthCheck from "../../utils/useAuthCheck";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {DbWorker} from "../../utils/DbWorker";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {setCurrentUser} from "../../redux/actions";
import {useDispatch} from "react-redux";

export default () => {
    const [isLoad, setIsLoad] = useState(false);
    const dispatch = useDispatch();
    useAuthCheck(routesPaths.MESSENGER);
    const sigInBtnRef = useRef();
    const formRef = useRef();
    const signInHandler = useCallback(async (e) => {
            const formData = formRef.current.elements;
            setIsLoad(true);
            disableBtn(sigInBtnRef.current);
            await DbWorker.auth(formData);
            activateBtn(sigInBtnRef.current);
            setIsLoad(false);
    },[]);
    useEffect(()=>{
        if (localStorage.curUser){
            dispatch(setCurrentUser(JSON.parse(localStorage.curUser)));
        }
    }, []);
    return (
        <div className={'AuthContainer'}>
            <Backdrop open={isLoad}>
                <CircularProgress/>
            </Backdrop>
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
