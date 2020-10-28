import React, {useEffect} from "react";
import {useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../../utils/DbWorker";
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import {avatarSizeCls, messageTypes, wsStatus} from "../../../configs/statuses";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
    sendMessage,
    setForwardMessage,
} from "../../../redux/actions";
import './InputMessageArea.scss';
import uniqid from 'uniqid';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {MicRecorder} from "./MicRecorder";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import {convertBlobToBase64} from "../../../utils/helpers";
import {Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import Popover from "@material-ui/core/Popover/Popover";
import classNames from 'classnames';
import swal from "sweetalert";
import {AttachFileNotification} from "./AttachFilesNotification";
import CreateIcon from '@material-ui/icons/Create';
import {HandTextPanel} from "./HandTextPanel";
import {AvatarUser} from "../../common/Avatar";

export default ({setPendingMessages, pendingMessages}) => {
    const [mes, setMes] = useState('');
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [attachedImage, setAttachedImage] = useState(null);
    const [isRecord, setIsRecord] = useState(false);
    const [isEmojiShown, setIsEmojiShown] = useState(false);
    const [handText, setHandText] = useState(false);
    const dispatch = useDispatch();
    const textArea = useRef();
    const emojiPickerBtn = useRef();
    const {wsStatus, curUser, chats, selectedChat} = useSelector(s => s.app);
    const {forwardMessage} = useSelector(s => s.system);
    const onChangeHandler = useCallback((e) => {
        const msg = e.target.value;
        setMes(msg);
    }, []);
    useEffect(() => setMes(''),[selectedChat]);
    const onAttachImageHandler = useCallback(async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) {
            return;
        }
        if (files.length > 10) {
            await swal('Ошибка', 'Количество файлов не должно превышать 10', 'error');
            return;
        }
        if (files.reduce((acc, x) => acc + x.size, 0) > 2e+7) {
            await swal('Ошибка', 'Размер вложения не может превышать 20мб', 'error');
            return;
        }
        let base64Files = [];
        for (let file of files) {
            const base64 = await convertBlobToBase64(file);
            base64Files.push(base64);
        }
        setAttachedImage(base64Files);
    }, [setAttachedImage]);
    const sendMessageHandler = useCallback(async (msg) => {
        if (msg || forwardMessage || recordedAudio || attachedImage) {
            const message = DbWorker.createMessage(msg, forwardMessage);
            message.isPending = true;
            message._id = uniqid();
            setPendingMessages(prev => [...prev, message]);
            if (forwardMessage) {
                dispatch(setForwardMessage(null));
            }
            const type = recordedAudio ? messageTypes.AUDIO : attachedImage ? messageTypes.IMAGE : messageTypes.TEXT;
            let recordBase64;
            if (recordedAudio) {
                recordBase64 = await convertBlobToBase64(recordedAudio.blob);
            } else if (attachedImage) {
                recordBase64 = attachedImage;
                setAttachedImage(null);
            }
            dispatch(sendMessage({text: msg, forwardMessages: forwardMessage, type, content: recordBase64}));
            setRecordedAudio(null);
            setMes('');
        }
    }, [wsStatus, setMes, forwardMessage, chats, pendingMessages, recordedAudio, attachedImage]);
    const submitHandler = useCallback((e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendMessageHandler(mes);
        }
    }, [sendMessageHandler, mes]);
    const onPasteHandler = useCallback(async (e) => {
        if (!e.clipboardData || !e.clipboardData.items) {
            return;
        }
        const items = e.clipboardData.items;
        const base64Arr = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") === -1) continue;
            const base64 = await convertBlobToBase64(items[i].getAsFile());
            base64Arr.push(base64);
        }
        setAttachedImage(prev => [...(prev ? prev : []), ...base64Arr]);
    }, [setAttachedImage]);
    const isSendDisabled = wsStatus === wsStatus.CLOSED || (!mes && !forwardMessage && !recordedAudio && !attachedImage) || Boolean(pendingMessages.length) || isRecord;
    return (
        <>
            <HandTextPanel handText={handText} setHandText={setHandText} setAttachedImage={setAttachedImage}/>

            <div className={'InputMessageArea'}>
                <AvatarUser user={curUser} classType={avatarSizeCls.Big}/>
                <div className={classNames('inputFileMessageContainer', {disabled: !!recordedAudio})}>
                    <label htmlFor={'inputFileMessage'}>
                        <AttachFileIcon fontSize={'large'}/>
                    </label>
                </div>
                <input multiple onChange={onAttachImageHandler} style={{display: 'none'}} id={'inputFileMessage'}
                       name={'inputFileMessage'} type={'file'}/>
                <TextareaAutosize
                    ref={textArea} rowsMax={8} rowsMin={3} onPaste={onPasteHandler}
                    value={mes} className={'InputMessageTextArea'} onKeyDown={submitHandler}
                    onChange={onChangeHandler} placeholder={'Введите сообщение'}/>
                <Fab
                    ref={emojiPickerBtn}
                    onClick={() => setIsEmojiShown(true)}
                    size={'large'}
                    color="primary">
                    <SentimentVerySatisfiedIcon/>
                </Fab>
                <Popover
                    open={isEmojiShown}
                    onClose={() => setIsEmojiShown(false)}
                    anchorEl={emojiPickerBtn.current}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                >
                    <Picker theme={'dark'} native={true} color={'orange'}
                            onClick={(emoji) => setMes((prev) => prev + emoji.native)} showPreview={false} title={''}/>
                </Popover>
                <Fab
                    onClick={() => sendMessageHandler(textArea.current.value)}
                    size={'large'}
                    disabled={isSendDisabled}
                    color="primary" aria-label="add">
                    <SendIcon/>
                </Fab>
                <Fab
                    onClick={() => setHandText(true)}
                    size={'large'}
                    disabled={!!attachedImage}
                    color="primary" aria-label="add">
                    <CreateIcon/>
                </Fab>
                <MicRecorder isRecord={isRecord} setIsRecord={setIsRecord} setRecordedAudio={setRecordedAudio}
                             recordedAudio={recordedAudio} isDisabled={!!attachedImage || !!recordedAudio}/>
                <AttachFileNotification forwardMessage={forwardMessage} recordedAudio={recordedAudio}
                                        setRecordedAudio={setRecordedAudio} setAttachedImage={setAttachedImage}
                                        attachedImage={attachedImage}/>
            </div>
        </>
    );
}
