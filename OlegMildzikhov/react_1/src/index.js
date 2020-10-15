import React, { Fragment } from 'react';
import ReactDom from 'react-dom';

//Var 1 before babel
// const element = React.createElement('h1', { className: 'react-app', id: 'react-id' }, 'Hello, React!');

//Var2 JSX

// const element = <h1 className="react-app"  id="react-id">Hello, React JSX</h1> 

const messagesData = ['Привет', 'тест', 'бонжур']

const Message = ({text, author}) => {
    return <h2> {text}-<b>{author}</b></h2>
};

const MessagesList = (props) => {
    return props.items.map((item, index) => ( 
    <Message text = { item }
    key = { index }
    author = "SidWonder"
    />));
    };
    const Button = (props) => {
                    const handleClick = (event) => {
                        console.log(event);
                        console.log('test butt');
                    };
                    return <button onClick = { handleClick } > { props.text } < /button>
                };

                ReactDom.render( <
                    >
                    <
                    MessagesList items = { messagesData } > < /MessagesList> <
                    Button text = "Нажми меня!" > < /Button> {
                        /* <Message text ={messagesData[0]}   author="SidWonder"/>
                        <Message text ={messagesData[1]}   author="SidWonder"/>
                        <Message text ={messagesData[2]}   author="SidWonder"/> */
                    } <
                    />, document.querySelector('#root'));