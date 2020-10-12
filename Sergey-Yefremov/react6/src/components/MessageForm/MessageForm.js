import React, { useState } from "react"
import { TextField, Fab } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

import "./MessageForm.css"

export default function Form({ onSend }) {
    const [textValue, setTextValue] = useState("")
    const [authorValue, setAuthorValue] = useState("")

    function submitHandler(event) {
        event.preventDefault()
        if (!authorValue.trim()) {
            setAuthorValue("Unknown")
        }
        let message = { text: textValue, author: authorValue || "Unknown" }
        if (textValue.trim()) {
            onSend(message)
        } else {
            alert("Message can't be blank!")
        }
        console.log(message)
        setTextValue("")
    }

    return (
        <form className="message-form">
            <TextField
                id="outlined-basic"
                label="Your message"
                variant="outlined"
                color="secondary"
                placeholder={"Some text..."}
                value={textValue}
                onChange={(event) => setTextValue(event.target.value)}
                autoFocus
            />
            <TextField
                id="outlined-basic"
                label="Your nickname"
                placeholder={"Nickname"}
                variant="outlined"
                color="secondary"
                value={authorValue}
                onChange={(event) => setAuthorValue(event.target.value)}
            />
            <Fab
                variant="round"
                color="secondary"
                type="submit"
                size="small"
                onClick={submitHandler}
            >
                <SendIcon />
            </Fab>
        </form>
    )
}
