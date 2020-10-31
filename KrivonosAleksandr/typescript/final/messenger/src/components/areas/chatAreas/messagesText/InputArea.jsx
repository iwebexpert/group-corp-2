import React, {Component, useState} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {faImage, faPaperPlane, faSmileWink} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

type InputAreaType = {
    onSend: (message: string) => void;
}

export const InputArea: React.FC<InputAreaType> = ({onSend}) => {

    const [dataForm, setDataForm] = useState({
        text: '',
    });

    const handleInputChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
        setDataForm({
            ...dataForm,
            text: event.target.value
        });
    }

    const handleInputSend = () => {
        const text = dataForm.text;

        if (!text) {
            return;
        }

        if (typeof onSend === 'function') {
            onSend(dataForm);
            setDataForm({...dataForm, text: ''});
        }
    }

    const onHandleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.ctrlKey && event.keyCode === 13) {
            handleInputSend();
        }
    }

    return (
        <div className="input_area">
            <div className="input_area__actions">
                <Link to="/chats/new" className="attach_file icon_template"><FontAwesomeIcon icon={faPaperclip}/></Link>
                <Link to="/chats/new" className="type_smile icon_template"><FontAwesomeIcon icon={faSmileWink}/></Link>
                <Link to="/chats/new" className="attach_img icon_template"><FontAwesomeIcon icon={faImage}/></Link>
            </div>
            <div className="message_area">
                    <textarea name="sendMessage"
                              className="message_send"
                              placeholder="Напишите сообщение..." value={dataForm.text}
                              onChange={handleInputChange}
                              onKeyDown={onHandleKeyDown}/>
                <button className="message_send__btn" onClick={handleInputSend}><FontAwesomeIcon
                    icon={faPaperPlane}/></button>
            </div>
        </div>
    );
}