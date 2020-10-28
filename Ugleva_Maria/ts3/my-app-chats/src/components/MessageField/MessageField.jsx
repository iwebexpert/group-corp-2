import React, { useState } from "react";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import "./MessageField.scss";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { fetchMesToChat } from '../../actions/chatsAction';

const  MessageField = () => {
  const dispatch = useDispatch();
  const [dataField, setdataField] = useState({
    text: "",
    author: "",
    id: nanoid(),
  });
  const chatId = useSelector((state) => state.activeChat);
  
  const handleChange = (e) => {
    setdataField({
      ...dataField,
      [e.target.name]: e.target.value });
  };
  const handleSend = (e) => {
    e.preventDefault();
    if (!(dataField.text && dataField.author)) {
      alert("Заполните все поля");
      return;
    };
    dispatch(fetchMesToChat(dataField, chatId));
    setdataField({ text: "", author: "", id: nanoid() });
  };
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSend(e);
    }
  };
    return (
      <>
        <form className="fields-inputs" onKeyDown={handleEnter}>
          <TextField
            label="Автор"
            name="author"
            value={dataField.author}
            type="text"
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Введите сообщение"
            name="text"
            value={dataField.text}
            onChange={handleChange}
            multiline
          />
          <Fab variant="round" color="primary" onClick={handleSend}>
            <Send />
          </Fab>
        </form>
      </>
    );
}

export default MessageField;
