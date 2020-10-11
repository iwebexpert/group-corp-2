import React from "react";
import {setCommonViewImages, setForwardMessage} from "../../../redux/actions";
import {useDispatch} from "react-redux";

export const AttachFileNotification = ({forwardMessage, recordedAudio,setRecordedAudio, setAttachedImage, attachedImage}) => {
    const dispatch = useDispatch();
    return (
        <>
            {
                forwardMessage && forwardMessage.chat ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение: {forwardMessage.messages.length} пересланных сообщений</b>
                        <img onClick={() => dispatch(setForwardMessage(null))} className={'DeleteSign'} alt={'DeleteSign'}
                             src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    </div>
                    : null
            }
            {
                recordedAudio ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение: Аудиосообщение
                            ({Math.round((recordedAudio.stopTime - recordedAudio.startTime) / 1000)}c)</b>
                        <img onClick={() => setRecordedAudio(null)} className={'DeleteSign'} alt={'DeleteSign'}
                             src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    </div>
                    : null
            }
            {
                attachedImage && attachedImage.length ?
                    <div className={'ForwardMessageNotification'}>
                        <b>Вложение:</b>
                        {
                            attachedImage.map((img, i) =>
                                <div
                                    onClick={() => dispatch(setCommonViewImages(attachedImage))}
                                    key={i} className={'imageSendPreviewMini'}>
                                    <img alt={'messageImage'} className={'messageImage'} style={{height: '100px', width: 'auto'}} src={img}/>
                                    <img alt={'messageImage'} onClick={(e) => {
                                        e.stopPropagation();
                                        setAttachedImage(prev => {
                                            const res = prev.filter((attachedImage) => attachedImage !== img);
                                            return res.length ? res : null;
                                        })}} className={'DeleteSign'}
                                         src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                                </div>
                            )
                        }
                        <img onClick={() => setAttachedImage(null)} className={'DeleteSign'} alt={'DeleteSign'}
                             src="https://img.icons8.com/color/48/000000/delete-sign.png"/>
                    </div>
                    : null
            }
        </>
    );
};
