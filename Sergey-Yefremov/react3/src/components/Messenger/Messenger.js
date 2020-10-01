import React, { useState, useEffect } from "react"
import MessageList from "components/MessageList/MessageList"
import Form from "components/MessageForm/MessageForm"
import ChatList from "components/ChatList/ChatList"
import Header from "components/Header/Header"

import "./Messenger.css"

export default function Messenger() {
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([
        { title: "Chat1" },
        { title: "Chat2" },
        { title: "Chat3" },
        { title: "Chat4" },
    ])

    useEffect(() => {
        if (messages.length && messages[messages.length - 1].author != "botSayHi") {
            const username = messages[messages.length - 1].author
            setTimeout(() => {
                setMessages(
                    messages.concat([
                        {
                            text: `Hello, ${username}! I'm a chatbot, welcome!`,
                            author: "botSayHi",
                        },
                    ])
                )
            }, 500)
        }
    }, [messages])

    function addMessage(text, author) {
        if (!author.trim()) {
            setMessages(messages.concat([{ text, author: "Unknown" }]))
        } else {
            setMessages(messages.concat([{ text, author }]))
        }
    }

    return (
        <div className="container">
            <Header />
            <div className="main">
                <ChatList chats={chats} />
                <div className="current-chat">
                    <MessageList messages={messages} />
                    <Form onClick={addMessage} />
                </div>
            </div>
        </div>
    )
}
