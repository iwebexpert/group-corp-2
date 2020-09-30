import React, { useState } from "react"
import { TextField, Fab } from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

import "./MessageForm.css"

export default function Form({ onClick }) {
    const [textValue, setTextValue] = useState("")
    const [authorValue, setAuthorValue] = useState("")

    function submitHandler(event) {
        event.preventDefault()

        if (textValue.trim()) {
            onClick(textValue, authorValue)
        } else {
            alert("Message can not be blank!")
        }
        setTextValue("")
    }

    return (
        <form onSubmit={submitHandler} className="message-form">
            <TextField
                id="outlined-basic"
                label="Enter the message:"
                variant="outlined"
                value={textValue}
                onChange={(event) => setTextValue(event.target.value)}
                autoFocus="true"
                placeholder={"Some text..."}
                color="secondary"
            />
            <TextField
                id="outlined-basic"
                label="And your nickname:"
                variant="outlined"
                value={authorValue}
                onChange={(event) => setAuthorValue(event.target.value)}
                placeholder={"Nickname"}
                color="secondary"

            />
            <Fab variant="round" color="primary" type="submit" size="small" style={{backgroundColor: "#20B2AA"}}>
                <SendIcon />
            </Fab>
        </form>
    )
}
