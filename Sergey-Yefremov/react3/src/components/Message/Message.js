import React from "react"
import classNames from "classnames"
import "./Message.css"

export default function Message({ author, text }) {
    const classes = classNames("message", {
        message__user: author !== "botSayHi",
        message__bot: author === "botSayHi",
    })
    return (
        <p className={classes}>
            <b>{author}: </b> {text}
        </p>
    )
}