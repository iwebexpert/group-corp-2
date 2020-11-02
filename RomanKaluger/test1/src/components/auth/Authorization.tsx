import React, {useCallback, useRef} from 'react';
import routesPaths from "../../configs/routesPaths";
import useAuthCheck from "../../utils/useAuthCheck";
import {push} from 'connected-react-router';
import {useDispatch} from "react-redux";
import {auth} from "../../redux/actions";
import {Dispatch} from "redux";
import {IInputAuth} from "../../utils/DbWorker";

const Auth: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    useAuthCheck(routesPaths.MESSENGER);
    const sigInBtnRef: React.Ref<HTMLDivElement> = useRef(null);
    const formRef: React.Ref<HTMLFormElement> = useRef(null);
    const signInHandler: () => Promise<void> = useCallback(async (): Promise<void> => {
        if (formRef.current) {
            const formData: IInputAuth = formRef.current.elements as IInputAuth;
            dispatch(auth(formData));
        }
    }, []);
    return (
        <div className={'AuthContainer'}>
            <form ref={formRef} className={'AuthArea'}>
                <div className="AuthAreaSection">
                    <label className={'AuthLabel'} htmlFor={'authEmail'}>Почта</label>
                    <input className={'AuthInput'} name={'authEmail'} id={'authEmail'} type={'text'}
                           placeholder={'Почта'}/>
                    <label className={'AuthLabel'} htmlFor={'authPassword'}>Пароль</label>
                    <input className={'AuthInput'} name={'authPassword'} id={'authPassword'} type={'password'}
                           placeholder={'Пароль'}/>
                    <div ref={sigInBtnRef} onClick={signInHandler} className={'button'}>Войти</div>
                    <div className={'Link'} onClick={(): void => {
                        dispatch(push(routesPaths.REGISTER))
                    }}>Регистрация
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Auth;
