import React, { useState } from "react"

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
        <form onSubmit={submitHandler}>
            <label>
                Enter the message:
                <input placeholder={"Some text..."} value={textValue} onChange={(event) => setTextValue(event.target.value)}/>
            </label>
            <label>
                And your nickname:
                <input placeholder={"Nickname"} value={authorValue} onChange={(event) => setAuthorValue(event.target.value)}/>
            </label>
            <button type="submit">Add a message</button>
        </form>
    )
}