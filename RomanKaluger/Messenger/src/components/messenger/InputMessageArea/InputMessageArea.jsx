import React from "react";
import {useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../../utils/DbWorker";
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import {wsStatuses} from "../../../configs/statuses";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {openUserProfile, setChats, setForwardMessage, setPendingMessages} from "../../../redux/actions";
import './InputMessageArea.scss';
import uniqid from 'uniqid';

export default ({setPendingMessages, pendingMessages}) => {
    const [mes, setMes] = useState('');
    const dispatch = useDispatch();
    const textArea = useRef();
    const {wsStatus, curUser, chats} = useSelector(s => s.app);

    const {forwardMessage} = useSelector(s => s.system);
    const onChangeHandler = useCallback((e) => {
        const msg = e.target.value;
        setMes(msg);
    }, []);
    const sendMessageHandler = useCallback(async (msg) => {
        if (msg || forwardMessage){
            const message = DbWorker.createMessage(msg, forwardMessage);
            message.isPending = true;
            message._id = uniqid();
            setPendingMessages(prev => [...prev, message]);
            dispatch(setForwardMessage(null));
            setMes('');
            await DbWorker.sendMessage(msg, forwardMessage);
        }
    }, [wsStatus, setMes, forwardMessage, chats, pendingMessages]);
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
                size={'large'} disabled={wsStatus === wsStatuses.CLOSED || (!mes && !forwardMessage) || Boolean(pendingMessages.length)}
                color="primary" aria-label="add">
                <SendIcon />
            </Fab>
            {
                forwardMessage && forwardMessage.chat ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение: {forwardMessage.messages.length} пересланных сообщений</b>
                        <img onClick={() => dispatch(setForwardMessage(null))} className={'DeleteSign'} src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    </div>
                    : null
            }
        </div>
    );
}
