import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Messege from './Messege';
import MessageForm from './MessageForm';

export default function Messenger() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    setRobotMessage({
      text: randRobotMessage,
      author: 'Робот',
      id: nanoid(),
      user: 'bot',
    });
  }, [text]);

  const allRobotMessages = [
    `Очень интересно, ${author}`,
    `Что еще расскажешь, ${author}?`,
    `Невероятно, ${author}`,
    `Ты такой интересный собеседник, ${author}`,
    `Хорошо, ${author}`,
    `Я очень удивлен, ${author}`,
  ];

  const randRobotMessage =
    allRobotMessages[Math.floor(Math.random() * allRobotMessages.length)];

  const [robotMessage, setRobotMessage] = useState({});

  const [Messages, setMessages] = useState([
    { author: 'Робот', text: 'Напиши мне', id: nanoid(), user: 'bot' },
  ]);

  const sendMessage = () => {
    if (author !== '' && text !== '') {
      setMessages([
        ...Messages,
        { author: author, text: text, id: nanoid(), user: 'human' },
      ]);
      setText('');
      robotSendMessage();
    } else {
      alert('Вы не заполнили форму');
    }
  };

  const robotSendMessage = () => {
    setTimeout(
      () =>
        setMessages([
          ...Messages,
          { author: author, text: text, id: nanoid(), user: 'human' },
          robotMessage,
        ]),
      1000
    );
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.which === 13) {
      sendMessage();
    }
  };

  return (
    <div className="messanger">
      <div className="Messanger_field">
        {Messages.map((message) => (
          <Messege
            author={message.author}
            text={message.text}
            user={message.user}
            key={message.id}
          />
        ))}
      </div>
      <MessageForm
        author={author}
        text={text}
        setAuthor={(event) => setAuthor(event.target.value)}
        setText={(event) => setText(event.target.value)}
        handleKeyDown={handleKeyDown}
        sendMessage={sendMessage}
      />
    </div>
  );
}
