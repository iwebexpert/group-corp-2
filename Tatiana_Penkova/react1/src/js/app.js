import React, { useState } from "react";
import ReactDom from "react-dom";
import pic from "../img/chat.png";


let messagesData = [{
    author: "Ivan",
    text: "Привет!"
},
{
    author: "Maxim",
    text: "Как дела?"
}]



const Message = ({ text, author }) => {
    return <div className="text">{text} - <b>{author}</b></div>;
};

const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message text={item.text} author={item.author} key={index} />));
};


const Button = ({ children }) => {
    const [data, setData] = useState(messagesData);
    const handleClick = (event) => {

        setData(prevData => prevData.concat({ author: "Ivan", text: "Нормально" }));
    }

    return <>
        <img src={pic} />
        <MessagesList items={data} />
        <button onClick={handleClick}>{children}</button>
    </>

};



ReactDom.render(
    <>
        <Button>Отправить сообщение</Button>

    </>
    , document.getElementById("root"));