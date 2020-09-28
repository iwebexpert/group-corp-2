import React, { useState, useEffect } from "react"
import MessageList from "./MessageList"
import Form from "./MessageForm"

function App() {
    const [messages, setMessages] = useState([])

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
            }, 1000)
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
            <h1>Chat</h1>
            <MessageList messages={messages} />
            <Form onClick={addMessage} />
        </div>
    )
}
export default App