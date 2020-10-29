import React, { useState} from 'react';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import {Fab, TextField} from "@material-ui/core";
import './MessageForm.css';


export const MessageForm = ({onSend}) => {
    const [dataForm, setDataForm] = useState({
        text: '',
        author: '',
    });

    const handleInputChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name] :  e.target.value
        })

        if (e.keyCode === 13 && e.ctrlKey) {
            this.handleMessageSend();
        }
    }

    const handleMessageSend = () => {
        const {text, author} = dataForm;

        if (!text || !author) {
            alert('Enter text message / author"s name');
            return;
        }
        if (typeof onSend === "function") {
            onSend(dataForm);
            setDataForm({
                ...dataForm,
                text: ''});
        }
    };

    return (<div className="form__wrapper">
            <div>
                <TextField label="Author" type="text" name="author" onChange={handleInputChange}
                           placeholder="enter author" value={dataForm.author}/>
            </div>
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    variant="outlined"
                    name="text" onChange={handleInputChange} onKeyDown={handleInputChange}
                    placeholder="enter text" value={dataForm.text}
                />
            </div>
            <div>
                <Fab color="primary"
                     aria-label="add"
                     onClick={handleMessageSend}>
                    <SendIcon/>
                </Fab>
            </div>
        </div>
    )

}

MessageForm.propTypes = {
    onSend: PropTypes.func.isRequired,
}