import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import { Send } from "@material-ui/icons";
import "./MessageForm.css";
import { MessageFormType } from "../../types";

export const MessageForm: React.FC<MessageFormType> = ({ onSend }) => {
    const [dataForm, setDataForm] = useState({
        text: "",
        author: "",
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        });
    };

    const handleMessageSend = (): void => {
        const { text, author } = dataForm;

        if (!text || text.trim().length === 0) {
            alert("Введите текст сообщения");
            return;
        }
        if (!author) {
            alert("Введите автора сообщения!");
            return;
        }
        onSend({ author, text });
        setDataForm({ ...dataForm, text: "" });
    };

    const keydownHandler = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.keyCode === 13 && event.ctrlKey) {
            handleMessageSend();
        }
    };

    return (
        <div className="send-window">
            <CachedIcon className="message-sending" />
            <TextField
                label="Введите имя автора"
                name="author"
                type="text"
                value={dataForm.author}
                onChange={handleInputChange}
                onKeyDown={keydownHandler}
            />
            <TextField
                label="Введите текст сообщения"
                name="text"
                value={dataForm.text}
                onChange={handleInputChange}
                onKeyDown={keydownHandler}
                multiline
                autoFocus
            />
            <Fab
                variant="round"
                color="primary"
                onClick={handleMessageSend}
            >
                <Send />
            </Fab>
        </div>
    )
};

