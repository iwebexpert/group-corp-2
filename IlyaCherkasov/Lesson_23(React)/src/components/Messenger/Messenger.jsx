import React, { useState, memo, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import Messege from './Messege';
import MessageForm from './MessageForm';

const Messenger = memo(({ allChats }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const [Messages, setMessages] = useState([]);

  let { id } = useParams();

  //Если мы переключили id, то восстанавливаю сообщения из определенного чата
  //Иначе если чат не выбран выводит сообщение
  useEffect(() => {
    if (id !== undefined) {
      setMessages(allChats[id].messages);
    } else {
      setMessages([
        {
          author: 'Робот',
          text: 'Пожалуйста, выберите чат',
          id: nanoid(),
          user: 'bot',
        },
      ]);
    }
  }, [id]);

  //Сохраняю сообщения для определенного чата
  useEffect(() => {
    if (id !== undefined) {
      allChats[id].messages = Messages;
    }
  }, [Messages]);

  //Отправка сообщения, если id потерян, выводим сообщение
  const sendMessage = () => {
    if (id === undefined) {
      alert('Выберите чат');
      return;
    }
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

  //Ответ от робота (работает для всех чатов)
  const robotSendMessage = () => {
    setTimeout(() => {
      setMessages([
        ...Messages,
        { author: author, text: text, id: nanoid(), user: 'human' },
        {
          text: getRandomRobotMessage(author),
          author: 'Робот',
          id: nanoid(),
          user: 'bot',
        },
      ]);
    }, 1000);
    console.log(Messages);
  };

  //Отправка сообщения по ctrl + enter
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.which === 13) {
      sendMessage();
    }
  };

  return (
    <div className="messanger">
      <div className="Messanger_field">
        {Messages.map((message) => (
          <Fragment key={message.id}>
            <Messege
              author={message.author}
              text={message.text}
              user={message.user}
            />
          </Fragment>
        ))}
      </div>
      <MessageForm
        author={author}
        text={text}
        setAuthor={setAuthor}
        setText={setText}
        handleKeyDown={handleKeyDown}
        sendMessage={sendMessage}
      />
    </div>
  );
});

//Вынес функцию рандомизирования ответа вне компонент (имитирую приход ответов из отдельного файла)
const getRandomRobotMessage = (author) => {
  const allRobotMessages = [
    `Очень интересно, ${author}`,
    `Что еще расскажешь, ${author}?`,
    `Невероятно, ${author}`,
    `Ты такой интересный собеседник, ${author}`,
    `Хорошо, ${author}`,
    `Я очень удивлен, ${author}`,
  ];
  return allRobotMessages[Math.floor(Math.random() * allRobotMessages.length)];
};

export default Messenger;
