import React from 'react'
import ReactDom from 'react-dom'

const messagesData = ['Привет', 'Hi', 'Тестовое сообщение']

const clicks = []

function handleClick()  {
    clicks.push('click')
    console.log(clicks)
    ReactDom.render(
    <>
    <MessagesList items={messagesData} />
    <hr/>
    <Clicks clicks={clicks}/>
    <Button fnc={handleClick}>Нажми на меня</Button>
    </>
        , document.getElementById('root'))
}

const Click = ({ number }) => {
    return <div>Клик номер <b>{number + 1}</b></div>
}

const Clicks = ({ clicks }) => {
    return clicks.map((item, index) => (<Click number={index} />))
}

const Message = ({ text, author }) => {
    return <div>{text} - <b>{author}</b></div>
}

const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message text={item} author="WebDev" key={index} />))
}

const Button = ({ children, fnc }) => {
    return <button onClick={() => fnc()}>{children}</button>
}

ReactDom.render(
    <>
        <MessagesList items={messagesData} />
        <hr/>
        <Clicks clicks={clicks}/>
        <Button fnc={handleClick}>Нажми на меня</Button>
    </>
    , document.getElementById('root'))
