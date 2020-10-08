import React from "react"
import classNames from "classnames"
import "./Message.css"

export default function Message({ author, text }) {
    const classes = classNames("message", {
        message__user: author !== "botSaySmth",
        message__bot: author === "botSaySmth",
    })
    return (
        <p className={classes}>
            <b>{author}: </b> {text}
        </p>
    )
}