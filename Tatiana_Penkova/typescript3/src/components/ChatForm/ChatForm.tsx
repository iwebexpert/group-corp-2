import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { ChatFormType } from "../../types";

export const ChatForm: React.FC<ChatFormType> = ({ onSend }) => {
    const [dataForm, setDataForm] = useState({
        title: ""
    });

    const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value
        });
    };

    const onSubmitForm = (): void => {
        const { title } = dataForm;

        if (!title || title.trim().length === 0) {
            alert("Введите название чата");
            return;
        }
        onSend({ title });
        setDataForm({ ...dataForm, title: "" });
    };
    const keydownHandler = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.keyCode === 13 && event.ctrlKey) {
            onSubmitForm();
        }
    };

    return (
        <div className="form-wrapper">
            <TextField
                label="Введите название чата"
                name="title"
                type="text"
                value={dataForm.title}
                onChange={onChangeInputHandler}
                onKeyDown={keydownHandler}
            />
            <Fab
                variant="round"
                color="primary"
                onClick={onSubmitForm}
            >
                <AddIcon />
            </Fab>
        </div>
    )
};
