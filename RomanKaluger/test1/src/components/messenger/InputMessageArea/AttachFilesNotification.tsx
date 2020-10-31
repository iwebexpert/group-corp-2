import React, {SetStateAction} from "react";
import {setCommonViewImages, setForwardMessage} from "../../../redux/actions";
import {useDispatch} from "react-redux";
import {CloseWindow} from "../../common/CloseWindow";
import {ISetFrowardMessagePayload} from "../../../redux/reduxTypes/rdxActions";
import {Dispatch} from "redux";
import {IRecordedAudio} from "./InputMessageArea";

type propTypes = {
    forwardMessage: ISetFrowardMessagePayload | null,
    recordedAudio: IRecordedAudio | null,
    setRecordedAudio: React.Dispatch<SetStateAction<IRecordedAudio | null>>
    setAttachedImage: React.Dispatch<SetStateAction<string[] | null>>,
    attachedImage: string[] | null
};
export const AttachFileNotification: React.FC<propTypes> = ({forwardMessage, recordedAudio, setRecordedAudio, setAttachedImage, attachedImage}) => {
    const dispatch: Dispatch = useDispatch();
    return (
        <>
            {
                forwardMessage && forwardMessage.chat ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение: {forwardMessage.messages.length} пересланных сообщений</b>
                        <img onClick={(): void => {
                            dispatch(setForwardMessage(null))
                        }} className={'DeleteSign'} alt={'DeleteSign'}
                             src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    </div>
                    : null
            }
            {
                recordedAudio ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение: Аудиосообщение
                            ({Math.round((recordedAudio.stopTime - recordedAudio.startTime) / 1000)}c)</b>
                        <img onClick={(): void => setRecordedAudio(null)} className={'DeleteSign'} alt={'DeleteSign'}
                             src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    </div>
                    : null
            }
            {
                attachedImage && attachedImage.length ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение:</b>
                        {
                            attachedImage.map((img: string, i: number): React.ReactNode =>
                                <div
                                    onClick={(): void => {
                                        dispatch(setCommonViewImages(attachedImage))
                                    }}
                                    key={i} className={'imageSendPreviewMini'}>
                                    <img alt={'messageImage'} className={'messageImage'}
                                         style={{height: '100px', width: 'auto'}} src={img}/>
                                    <img alt={'messageImage'} onClick={(e: React.MouseEvent): void => {
                                        e.stopPropagation();
                                        setAttachedImage((prev: string[] | null): string[] | null => {
                                            if (!prev) {
                                                return null;
                                            }
                                            const res: string[] = prev.filter((attachedImage: string): boolean => attachedImage !== img);
                                            return res.length ? res : null;
                                        })
                                    }} className={'DeleteSign'}
                                         src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                                </div>
                            )
                        }
                        <CloseWindow actionClose={(): void => setAttachedImage(null)}/>
                    </div>
                    : null
            }
        </>
    );
};
