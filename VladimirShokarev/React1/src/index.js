import React from 'react';
import ReactDom from 'react-dom';

const messagesData = ['Привет', 'Hi', 'Тестовое сообщение'];

const Message = ({text, author}) => {
    return <div>{text} - <b>{author}</b></div>;
};

const MessagesList = (props) => {
    return props.items.map((item, index) => (<Message text={item} author="WebDev" key={index} />));
};

const Button = ({children}) => {
    const handleClick = (event) => {
        messagesData.push('Нормально');
        
        ReactDom.render(
            <>
                <MessagesList items={messagesData} />
                <Button>Нормально</Button>
            </>
        , document.getElementById('root'));        
    };

    return <>
        <button onClick={handleClick}>{children}</button>
    </>
};

ReactDom.render(
    <>
        <MessagesList items={messagesData} />
        <Button>Нормально</Button>
    </>
, document.getElementById('root'));