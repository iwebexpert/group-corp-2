import React from "react";
import {useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../utils/DbWorker";
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import {wsStatuses} from "../../configs/statuses";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {openUserProfile} from "../../redux/actions";

export default () => {
    const [mes, setMes] = useState('');
    const dispatch = useDispatch();
    const textArea = useRef();
    const {wsStatus, curUser} = useSelector(s => s.app);
    const onChangeHandler = useCallback((e) => {
        const msg = e.target.value;
        setMes(msg);
    }, []);
    const sendMessageHandler = useCallback(async (msg) => {
        if (msg){
            setMes('');
            await DbWorker.sendMessage(msg);
        }
    }, [wsStatus, setMes]);
    const submitHandler = useCallback((e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendMessageHandler(mes);
        }
    }, [sendMessageHandler, mes]);
    const avatarContent = curUser ?  (curUser.avatarUrl ? <img src={curUser.avatarUrl} alt={'Аватар'}/> : curUser.name.slice(0,2)) : null;
    return (
        <div className={'InputMessageArea'}>
            <div onClick={() => dispatch(openUserProfile(curUser))} className="avatarBig">{avatarContent}</div>
            <TextareaAutosize
                ref={textArea} rowsMax={8} rowsMin={3}
                value={mes} className={'InputMessageTextArea'} onKeyDown={submitHandler}
                onChange={onChangeHandler} placeholder={'Введите сообщение'}/>
            <Fab
                onClick={() => sendMessageHandler(textArea.current.value)}
                size={'large'} disabled={wsStatus === wsStatuses.CLOSED || !mes}
                color="primary" aria-label="add">
                <SendIcon />
            </Fab>
        </div>
    );
}
