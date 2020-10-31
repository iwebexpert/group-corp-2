import React, {useEffect} from "react";
import {useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DbWorker} from "../../../utils/DbWorker";
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import {avatarSizeCls, messageTypes, wsStatus as wsStatus_} from "../../../configs/statuses";
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
import {BaseEmoji, Picker} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import Popover from "@material-ui/core/Popover/Popover";
import classNames from 'classnames';
import swal from "sweetalert";
import {AttachFileNotification} from "./AttachFilesNotification";
import CreateIcon from '@material-ui/icons/Create';
import {HandTextPanel} from "./HandTextPanel";
import {AvatarUser} from "../../common/Avatar";
import {IMessage} from "../../../types/globalTypes";
import {Dispatch} from "redux";
import {IAppState, ICombinedState, ISystemState} from "../../../redux/reduxTypes/rdx";

export interface IRecordedAudio {
    blob: Blob;
    stopTime: number;
    startTime: number;
}

type propTypes = {
    setPendingMessages: (x: React.SetStateAction<IMessage[]>) => void,
    pendingMessages: IMessage[]
};
const InputMessageArea: React.FC<propTypes> = ({setPendingMessages, pendingMessages}) => {
    const [mes, setMes] = useState<string>('');
    const [recordedAudio, setRecordedAudio] = useState<IRecordedAudio | null>(null);
    const [attachedImage, setAttachedImage] = useState<string[] | null>(null);
    const [isRecord, setIsRecord] = useState<boolean>(false);
    const [isEmojiShown, setIsEmojiShown] = useState<boolean>(false);
    const [handText, setHandText] = useState<boolean>(false);
    const dispatch: Dispatch = useDispatch();
    const textArea: React.Ref<HTMLTextAreaElement> = useRef(null);
    const emojiPickerBtn: React.Ref<HTMLButtonElement> = useRef(null);
    const {wsStatus, curUser, chats, selectedChat} = useSelector<ICombinedState, IAppState>(s => s.app);
    const {forwardMessage} = useSelector<ICombinedState, ISystemState>(s => s.system);
    const onChangeHandler: React.ChangeEventHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const msg: string = e.target.value;
        setMes(msg);
    }, []);
    useEffect((): void => setMes(''), [selectedChat]);
    const onAttachImageHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const files: File[] = Array.from(e.target.files ?? []);
        if (!files.length) {
            return;
        }
        if (files.length > 10) {
            await swal('Ошибка', 'Количество файлов не должно превышать 10', 'error');
            return;
        }
        if (files.reduce((acc: number, x: File): number => acc + x.size, 0) > 2e+7) {
            await swal('Ошибка', 'Размер вложения не может превышать 20мб', 'error');
            return;
        }
        let base64Files: string[] = [];
        let file: File;
        for (file of files) {
            const base64: string = await convertBlobToBase64(file);
            base64Files.push(base64);
        }
        setAttachedImage(base64Files);
    }, [setAttachedImage]);
    const sendMessageHandler = useCallback(async (msg: string): Promise<void> => {
        if (msg || forwardMessage || recordedAudio || attachedImage) {
            const message: IMessage = DbWorker.createMessage(msg, forwardMessage);
            message.isPending = true;
            message._id = uniqid();
            setPendingMessages((prev: IMessage[]): IMessage[] => [...prev, message]);
            if (forwardMessage) {
                dispatch(setForwardMessage(null));
            }
            const type: messageTypes = recordedAudio ? messageTypes.AUDIO : attachedImage ? messageTypes.IMAGE : messageTypes.TEXT;
            let recordBase64: string | string[] | null;
            if (recordedAudio) {
                recordBase64 = await convertBlobToBase64(recordedAudio.blob);
            } else if (attachedImage) {
                recordBase64 = attachedImage;
                setAttachedImage(null);
            } else {
                recordBase64 = null;
            }
            dispatch(sendMessage({text: msg, forwardMessages: forwardMessage, type, content: recordBase64}));
            setRecordedAudio(null);
            setMes('');
        }
    }, [wsStatus, setMes, forwardMessage, chats, pendingMessages, recordedAudio, attachedImage]);
    const submitHandler: React.KeyboardEventHandler = useCallback((e: React.KeyboardEvent): void => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendMessageHandler(mes);
        }
    }, [sendMessageHandler, mes]);
    const onPasteHandler: React.ClipboardEventHandler = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (!e.clipboardData || !e.clipboardData.items) {
            return;
        }
        const items: DataTransferItemList = e.clipboardData.items;
        const base64Arr: string[] = [];
        for (let i: number = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") === -1) continue;
            const file: File | null = items[i].getAsFile();
            if (file) {
                const base64: string = await convertBlobToBase64(file);
                base64Arr.push(base64);
            }
        }
        setAttachedImage((prev: string[] | null): string[] | null => prev && base64Arr.length ? [...(prev ? prev : []), ...base64Arr] : null);
    }, [setAttachedImage]);
    const isSendDisabled: boolean = wsStatus === wsStatus_.CLOSED || (!mes && !forwardMessage && !recordedAudio && !attachedImage) || Boolean(pendingMessages.length) || isRecord;
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
                    onClick={(): void => setIsEmojiShown(true)}
                    size={'large'}
                    color="primary">
                    <SentimentVerySatisfiedIcon/>
                </Fab>
                <Popover
                    open={isEmojiShown}
                    onClose={(): void => setIsEmojiShown(false)}
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
                            onClick={(emoji: BaseEmoji): void => setMes((prev: string): string => prev + emoji.native)}
                            showPreview={false} title={''}/>
                </Popover>
                <Fab
                    onClick={(): Promise<void> | null => textArea.current ? sendMessageHandler(textArea.current.value) : null}
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
                             isDisabled={!!attachedImage || !!recordedAudio}/>
                <AttachFileNotification forwardMessage={forwardMessage} recordedAudio={recordedAudio}
                                        setRecordedAudio={setRecordedAudio} setAttachedImage={setAttachedImage}
                                        attachedImage={attachedImage}/>
            </div>
        </>
    );
};
export default InputMessageArea;
