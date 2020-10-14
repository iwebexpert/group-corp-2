import React from "react";
import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export class ChatForm extends React.Component {

    state = {
        title: "",
    };

    onChangeInputHandler = (event) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    };

    onSubmitForm = () => {
        const { title } = this.state;
        const { onSend } = this.props;

        if (!title || title.trim().length == 0) {
            alert("Введите название чата");
            return;
        }

        if (typeof onSend === "function") {
            onSend(this.state);
            this.setState({ title: "" });
        }

    };

    keydownHandler = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.onSubmitForm();
        }

    }


    render() {

        const { title } = this.state;
        return (
            <div className="form-wrapper">
                <TextField
                    label="Введите название чата"
                    name="title"
                    type="text"
                    value={title}
                    onChange={this.onChangeInputHandler}
                    onKeyDown={this.keydownHandler}
                />
                <Fab
                    variant="round"
                    color="primary"
                    onClick={this.onSubmitForm}

                >
                    <AddIcon />
                </Fab>
            </div>
        )
    }
}