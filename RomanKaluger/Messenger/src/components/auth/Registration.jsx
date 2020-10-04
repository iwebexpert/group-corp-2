import React, {useCallback, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import routesPaths from "../../configs/routesPaths";
import {DbWorker} from "../../utils/DbWorker";
import {activateBtn, disableBtn} from "../../utils/helpers";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";

const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default () => {
    const [isLoad, setIsLoad] = useState(false);
    const signBtnRef = useRef();
    const formRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const signHandler = useCallback(async (e) => {
           setIsLoad(true);
           const formData = formRef.current.elements;
           disableBtn(signBtnRef.current);
           await DbWorker.register(formData);
           activateBtn(signBtnRef.current);
           setIsLoad(false);
    },[]);
    const onRequiredChange = (e) => {
        if (password1Ref.current.value !== password2Ref.current.value){
            password1Ref.current.classList.add('alertInput');
            password2Ref.current.classList.add('alertInput');
            disableBtn(signBtnRef.current);
        } else {
            password1Ref.current.classList.remove('alertInput');
            password2Ref.current.classList.remove('alertInput');
            activateBtn(signBtnRef.current);
        }
        if (!emailRegexp.test(emailRef.current.value)){
            emailRef.current.classList.add('alertInput');
            disableBtn(signBtnRef.current);
        } else {
            emailRef.current.classList.remove('alertInput');
            activateBtn(signBtnRef.current);
        }
        if (!nameRef.current.value){
            nameRef.current.classList.add('alertInput');
            disableBtn(signBtnRef.current);
        } else {
            nameRef.current.classList.remove('alertInput');
            activateBtn(signBtnRef.current);
        }
    };
    return (
        <div className={'AuthContainer'}>
            <Backdrop open={isLoad}>
                <CircularProgress/>
            </Backdrop>
            <form ref={formRef} className={'AuthArea'}>
                <div className={'AuthAreaSection'}>
                    <input className={'AuthInput'} name={'regAge'} id={'regAge'} type={'text'} placeholder={'Возраст'}/>
                    <input className={'AuthInput'} name={'regAva'} id={'regAva'} type={'text'} placeholder={'URL аватара'}/>
                    <input className={'AuthInput'} name={'regCity'} id={'regCity'} type={'text'} placeholder={'Город'}/>
                    <input className={'AuthInput'} name={'regCountry'} id={'regCountry'} type={'text'} placeholder={'Страна'}/>
                    <select name={'regSex'} id={'regSex'} className={'AuthInput'}>
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                </div>
                <div className={'AuthAreaSection'}>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={nameRef} name={'regName'} id={'regName'} type={'text'} placeholder={'Имя*'}/>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={emailRef} name={'regEmail'} id={'regEmail'} type={'text'} placeholder={'Почта*'}/>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={password1Ref} name={'regPassword'} id={'regPassword'} type={'password'} placeholder={'Пароль*'}/>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={password2Ref} name={'regPassword2'} id={'regPassword2'} type={'password'} placeholder={'Повторите Пароль*'}/>
                    <select name={'regStatus'} id={'regStatus'} className={'AuthInput'}>
                        <option>Женат(Замужем)</option>
                        <option>Свободен(а)</option>
                    </select>
                </div>
                <div ref={signBtnRef} onClick={signHandler} className={'button'}>Зарегистрироваться</div>
                <NavLink to={routesPaths.AUTH} >Авторизация</NavLink>
            </form>
        </div>
    );
}
