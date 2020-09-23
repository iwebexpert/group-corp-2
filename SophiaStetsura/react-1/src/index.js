import React from 'react';
import ReactDom from 'react-dom';

//Вариант 1
//const element = React.createElement('h1', {className: 'react-app', id: 'react-id'}, 'Hello, React.js!');

//Вариант 2 (JSX)
//const element = <h1 className="react-app" id="react-id">Hello, React.js!!!</h1>;

const messagesData = ['Привет', 'Hi', 'Hello'];
const authorData = ['Ivan', 'Oleg', 'Anna'];

const Message = ({text, author}) => {
    return <div>{text} - <b>{author}</b></div>;
};

const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message text={item} author={item} key={index} />));
};


const Button = ({children}) => {
    const handleClick = (event) => {
        console.log(event);
        console.log('Тестовая кнопка');
    };

    return <button onClick={handleClick}>{children}</button>;
};

ReactDom.render(
    <>
        <MessagesList items={messagesData} />
        <MessagesList items={authorData} />
        <Button>Тестовая кнопка</Button>
    </>
, document.getElementById('root'));