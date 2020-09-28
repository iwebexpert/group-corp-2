import React, { useState, useEffect } from 'react';
import Messege from './Messege';

export default function Messenger() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    setRobotMessage({
      text: randRobotMessage,
      author: 'Робот',
    });
  }, [author]);

  const allRobotMessages = [
    `Очень интересно, ${author}`,
    `Что еще расскажешь, ${author}?`,
    `Невероятно, ${author}`,
    `Ты такой интересный собеседник, ${author}`,
    `${author}! может хватит мне писать`,
    `Ну хорошо, ${author}`,
    `Я очень удивлен, ${author}`,
  ];

  const randRobotMessage =
    allRobotMessages[Math.floor(Math.random() * allRobotMessages.length)];

  const [robotMessage, setRobotMessage] = useState({});

  const [Messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (author !== '' && text !== '') {
      setMessages([...Messages, { author: author, text: text }]);
      setText('');
      robotSendMessage();
    } else {
      alert('Вы не заполнили форму');
    }
  };

  const robotSendMessage = () => {
    setRobotMessage({
      text: randRobotMessage,
      author: 'Робот',
    });
    setTimeout(
      () =>
        setMessages([
          ...Messages,
          { author: author, text: text },
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
    <div className="wrapper">
      <div className="Messanger__form">
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          name="author"
          placeholder="Введите имя автора"
        />
        <textarea
          name="text"
          placeholder="Введите сообщение"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={sendMessage}>
          Ctrl + Enter чтобы отправить сообщение
        </button>
      </div>
      <div>
        {Messages.map((message) => (
          <Messege author={message.author} text={message.text} />
        ))}
      </div>
    </div>
  );
}
