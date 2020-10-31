import React, {useCallback, useRef} from 'react';
import routesPaths from "../../configs/routesPaths";
import {IInputReg} from "../../utils/DbWorker";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {useDispatch} from "react-redux";
import {register} from "../../redux/actions";
import {push} from "connected-react-router";
import {Dispatch} from "redux";

const emailRegexp: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Registration: React.FC = () => {
    const signBtnRef: React.Ref<HTMLDivElement> = useRef(null);
    const formRef: React.Ref<HTMLFormElement> = useRef(null);
    const password1Ref: React.Ref<HTMLInputElement> = useRef(null);
    const password2Ref: React.Ref<HTMLInputElement> = useRef(null);
    const nameRef: React.Ref<HTMLInputElement> = useRef(null);
    const emailRef: React.Ref<HTMLInputElement> = useRef(null);
    const dispatch: Dispatch = useDispatch();
    const signHandler: () => void = useCallback((): void => {
        if (formRef.current) {
            const formData: IInputReg = formRef.current.elements as IInputReg;
            dispatch(register(formData));
        }
    }, []);
    const onRequiredChange = (): void => {
        if (!(password1Ref.current && password2Ref.current && emailRef.current && nameRef.current && signBtnRef.current)) {
            return;
        }
        if (password1Ref.current.value !== password2Ref.current.value) {
            password1Ref.current.classList.add('alertInput');
            password2Ref.current.classList.add('alertInput');
            disableBtn(signBtnRef.current);
        } else {
            password1Ref.current.classList.remove('alertInput');
            password2Ref.current.classList.remove('alertInput');
            activateBtn(signBtnRef.current);
        }
        if (!emailRegexp.test(emailRef.current.value)) {
            emailRef.current.classList.add('alertInput');
            disableBtn(signBtnRef.current);
        } else {
            emailRef.current.classList.remove('alertInput');
            activateBtn(signBtnRef.current);
        }
        if (!nameRef.current.value) {
            nameRef.current.classList.add('alertInput');
            disableBtn(signBtnRef.current);
        } else {
            nameRef.current.classList.remove('alertInput');
            activateBtn(signBtnRef.current);
        }
    };
    return (
        <div className={'AuthContainer'}>
            <form ref={formRef} className={'AuthArea'}>
                <div className={'AuthAreaSection'}>
                    <input className={'AuthInput'} name={'regAge'} id={'regAge'} type={'text'} placeholder={'Возраст'}/>
                    <input className={'AuthInput'} name={'regAva'} id={'regAva'} type={'text'}
                           placeholder={'URL аватара'}/>
                    <input className={'AuthInput'} name={'regCity'} id={'regCity'} type={'text'} placeholder={'Город'}/>
                    <input className={'AuthInput'} name={'regCountry'} id={'regCountry'} type={'text'}
                           placeholder={'Страна'}/>
                    <select name={'regSex'} id={'regSex'} className={'AuthInput'}>
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                </div>
                <div className={'AuthAreaSection'}>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={nameRef} name={'regName'}
                           id={'regName'} type={'text'} placeholder={'Имя*'}/>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={emailRef} name={'regEmail'}
                           id={'regEmail'} type={'text'} placeholder={'Почта*'}/>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={password1Ref} name={'regPassword'}
                           id={'regPassword'} type={'password'} placeholder={'Пароль*'}/>
                    <input className={'AuthInput'} onChange={onRequiredChange} ref={password2Ref} name={'regPassword2'}
                           id={'regPassword2'} type={'password'} placeholder={'Повторите Пароль*'}/>
                    <select name={'regStatus'} id={'regStatus'} className={'AuthInput'}>
                        <option>Женат(Замужем)</option>
                        <option>Свободен(а)</option>
                    </select>
                </div>
                <div ref={signBtnRef} onClick={signHandler} className={'button'}>Зарегистрироваться</div>
                <div className={'Link'} onClick={(): void => {
                    dispatch(push(routesPaths.AUTH))
                }}>Авторизация
                </div>
            </form>
        </div>
    );
};
export default Registration;
