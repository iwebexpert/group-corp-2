import React from "react";
import {useCallback, useEffect, useRef, useState, useMemo} from "react";
import autosize from "autosize/src/autosize";
import {useSelector} from "react-redux";
import {activateBtn, disableBtn} from "../../utils/helpers";
import {DbWorker} from "../../utils/DbWorker";

export default () => {
    const [mes, setMes] = useState('');
    const textArea = useRef();
    const sendBtn = useRef();
    const {wsStatus} = useSelector(s => s.app);
    useEffect(()=>{autosize(textArea.current)}, []);
    useEffect(() => {
        if (wsStatus) {
            activateBtn(sendBtn.current);
        } else {
            disableBtn(sendBtn.current);
        }
    },[wsStatus]);
    const onChangeHandler = useCallback((e) => {
        const msg = e.target.value;
        setMes(msg);
    }, []);
    useEffect(() => {
        if (mes === ''){
            disableBtn(sendBtn.current);
            return;
        }
        activateBtn(sendBtn.current);
    },[mes]);
    const sendMessageHandler = useCallback(async (msg) => {
        if (msg){
            disableBtn(sendBtn.current);
            await DbWorker.sendMessage(msg);
            activateBtn(sendBtn.current);
            setMes('');
        }
    }, [wsStatus, setMes]);
    const submitHandler = useCallback((e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendMessageHandler(mes);
        }
    }, [sendMessageHandler, mes]);
    return (
        <div className={'InputMessageArea'}>
            <textarea value={mes} onKeyDown={submitHandler} ref={textArea} onChange={onChangeHandler} placeholder={'Введите сообщение'} className={'InputMessageTextArea'}/>
            <div ref={sendBtn} onClick={() => sendMessageHandler(textArea.current.value)} className={'SendMsgBtn SendMsgBtnDisable'}/>
        </div>
    );
}
