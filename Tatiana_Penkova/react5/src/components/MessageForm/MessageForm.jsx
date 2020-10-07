import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { profile } from "../../Helpers"
import "./MessageForm.css";

export class MessageForm extends Component {
    state = {
        text: "",
        author: `${profile.nickname}`,
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    };

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    };

    handleMessageSend = () => {
        const { onSend } = this.props;
        const { text, author } = this.state;

        if (!text || text.trim().length == 0) {
            alert("Введите текст сообщения");
            return;
        }
        if (!author) {
            alert("Введите автора сообщения!");
            return;
        }
        if (typeof onSend === "function") {
            onSend(this.state);

            this.setState({ text: "" });
        }
    };

    keydownHandler = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            this.handleMessageSend();
        }
    }

    render() {
        const { text, author } = this.state;
        return (
            <div className="send-window">

                <TextField
                    label="Введите имя автора"
                    name="author"
                    type="text"
                    value={author}
                    onChange={this.handleInputChange}
                    onKeyDown={this.keydownHandler}
                />
                <TextField
                    label="Введите текст сообщения"
                    name="text"
                    value={text}
                    onChange={this.handleInputChange}
                    onKeyDown={this.keydownHandler}
                    multiline
                    autoFocus
                />
                <Fab
                    variant="round"
                    color="primary"
                    onClick={this.handleMessageSend}
                >
                    <Send />
                </Fab>
            </div>
        );
    }
}