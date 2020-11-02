import React, { useState } from "react";
import Swal from "sweetalert2";
import { TextField, Fab } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import Tooltip from '@material-ui/core/Tooltip';
import { nanoid } from "nanoid";

import "../../App.scss";

type MessageFormPropsType = {
	onSend: (message:MessageType) => void,
	classform: string,
	isPending: boolean,
};

export const MessageForm:React.FC<MessageFormPropsType> = ({ onSend, classform, isPending }) => {
  const [formData, setFormData] = useState<MessageType>({
    text: "",
	 author: "",
	 id: '',
	 time: '',
	 chatId: 0,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = ():void => {
	 const { text, author }:MessageType = formData;
	 formData.id = nanoid()
	 const time = new Date();
    formData.time = time.toLocaleString("en-US", {
      hour: "numeric",
		minute: "numeric",
		hour12: false,
    });

    const textRegExp:RegExp = /\S|(^\w$)/gi;

    if (!author) {
      Swal.fire({
        text: "Введите автора сообщения",
        icon: "error",
      });
      return;
    }

    if (author === "Бот") {
      Swal.fire({
        text: "Недопустимое имя пользователя",
        icon: "error",
      });
      return;
    }

    if (!text || !textRegExp.test(text)) {
      Swal.fire({
        text: "Введите текст сообщения",
        icon: "error",
      });
      return;
	 }
	 
      onSend(formData);
      setFormData({ ...formData, text: "" });
  };

  const keyDownHandler = (e:React.KeyboardEvent<HTMLDivElement>):void => {
    if (e.keyCode === 13 && e.ctrlKey) sendMessage();
  };

  return (
    <div className={classform}>
      <TextField
        label="Введите имя автора"
        name="author"
        type="text"
        value={formData.author}
        onChange={onInputChange}
        autoFocus
      />
      <TextField
        label="Введите сообщение"
        name="text"
        value={formData.text}
        onChange={onInputChange}
        onKeyDown={keyDownHandler}
        multiline
      />
		<Tooltip title="Send" aria-label="Send">
		<Fab variant="round" color="primary" size="medium" onClick={sendMessage}>
        <Send />
      </Fab>
		</Tooltip>
      {isPending ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};
