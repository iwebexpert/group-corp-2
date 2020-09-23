import React, { useState } from "react";
import ReactDom from "react-dom";
import "./index.css";

function App() {
    const [messages, setMessages] = React.useState([
        { text: "Message1", author: "User1" },
        { text: "Message2", author: "User2" },
        { text: "Message3", author: "User3" },
    ]);

    const MessageList = ({ messages }) => {
        return messages.map((item, index) => (
            <Message key={index} author={item.author} text={item.text} />
        ));
    };

    const Message = ({ author, text }) => {
        return (
            <div>
                <p>
                    <b>Message: </b> {text} <i>(author: {author})</i>
                </p>
            </div>
        );
    };

    function addMessage(text, author) {
        if (!author.trim()) {
            setMessages(messages.concat([{ text, author: "Unknown" }]));
        } else {
            setMessages(messages.concat([{ text, author }]));
        }
    }

    const Form = ({ onClick }) => {
        const [textValue, setTextValue] = useState("");
        const [authorValue, setAuthorValue] = useState("");

        function submitHandler(event) {
            event.preventDefault();

            if (textValue.trim()) {
                onClick(textValue, authorValue);
            } else {
                alert("Message can not be blank!");
            }
        }

        return (
            <form onSubmit={submitHandler}>
                <label>
                    Enter the message:
                    <input
                        value={textValue}
                        onChange={(event) => setTextValue(event.target.value)}
                    ></input>
                </label>
                <label>
                    Enter your name:
                    <input
                        value={authorValue}
                        onChange={(event) => setAuthorValue(event.target.value)}
                    ></input>
                </label>
                <button type="submit">Add message</button>
            </form>
        );
    };

    return (
        <div className="container">
            <h1>Chat</h1>
            <MessageList messages={messages} />
            <Form onClick={addMessage} />
        </div>
    );
}

ReactDom.render(<App />, document.getElementById("root"));