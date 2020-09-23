import React from "react";
import {useCallback, useEffect, useRef, useState, useMemo} from "react";
import autosize from "autosize/src/autosize";
import config from "./../../configs/connectionConfig";
import {useDispatch, useSelector} from "react-redux";
import uniqid from 'uniqid';
import {sendMessage} from "../../redux/actions";

export default () => {
    const [mes, setMes] = useState('');
    const textArea = useRef();
    const sendBtn = useRef();
    const disableSendBtn = useCallback(() => sendBtn.current.classList.add('disabled'), []);
    const activateSendBtn = useCallback(() => sendBtn.current.classList.remove('disabled'),[]);
    const isWs = useSelector(s => s.app.wsStatus);
    const dispatch = useDispatch();
    useEffect(()=>{
        autosize(textArea.current)
    }, []);
    useEffect(() => {
        if (isWs) {
            activateSendBtn();
        } else {
            disableSendBtn();
        }
    },[isWs]);
    const onChangeHandler = useCallback((msg) => {
        setMes(msg);
        if (msg === ''){
            disableSendBtn();
            return;
        }
        activateSendBtn();
    }, []);
    const sendMessageHandler = useCallback((msg) => {
        /*if (isWs) {
            config.ws.send(JSON.stringify({
                text: msg,
                isRead: {type: Boolean, required: true},
                dateSend: Date.now(),
                id: uniqid(),
                author: { type: Schema.Types.ObjectId, ref: 'User' },
                readers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
            }));
        }*/
        if (msg){
            dispatch(sendMessage(msg));
            textArea.current.value = '';
        }
    }, [isWs]);
    return (
        <div className={'InputMessageArea'}>
            <textarea value={mes} ref={textArea} onChange={(e) => onChangeHandler(e.target.value)} placeholder={'Введите сообщение'} className={'InputMessageTextArea'}/>
            <div ref={sendBtn} onClick={() => sendMessageHandler(textArea.current.value)} className={'SendMsgBtn SendMsgBtnDisable'}/>
        </div>
    );
}
