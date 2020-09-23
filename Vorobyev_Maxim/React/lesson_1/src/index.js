import React from 'react';
import ReactDom from 'react-dom';

//Вариант 1
// const element = React.createElement('h1', {className: 'react-app', id: 'react-id'}, 'Hello, React.js!');

//Вариант 2 (JSX)
// const element = <h1 className="react-app" id="react-id">Hello, React.js!!!</h1>

const messagesData = ["Привет", "Hi", "Тестовое сообщение"];

const Message = ({text, author}) => {
  return <div>{text} - <b>{author}</b></div>;
};

const MessagesList = (props) => {
  return props.items.map((item, index) => (<Message text={item} author="WebDev" key={index}/>));
}; 

const DefaultMessage = (props) => {
  return <div>{props.text} - <b>{props.author}</b></div>
};

const Button = ({children}) => {
  const handleClick = (event) => {
    messagesData.push("нормально");
    ReactDom.render(
      <>
        <MessagesList items = {messagesData}/>
        <Button>Добавить сообщение</Button>
      </>
      , document.getElementById('root'));
  };
  
  return <button onClick={handleClick}>{children}</button>
};

ReactDom.render(
  <>
    <MessagesList items = {messagesData}/>
    <Button>Добавить сообщение</Button>
  </>
  , document.getElementById('root'));