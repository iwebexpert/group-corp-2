import React from "react";

import { TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import "./ChatForm.css";

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

    if (!title) {
      alert("Укажите название чата!");
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
  };

  render() {
    const { title } = this.state;
    return (
      <div className="add-chat">
        <TextField
          className="input-title"
          variant="outlined"
          label="Введите название чата"
          name="title"
          type="text"
          value={title}
          onChange={this.onChangeInputHandler}
          onKeyDown={this.keydownHandler}
        />
        <Fab className="btn-add" variant="round" onClick={this.onSubmitForm}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
