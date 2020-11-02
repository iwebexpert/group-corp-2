import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import './Chat.css';

import { MessageType } from '../../types/types';

import { MessagesList } from '../MessagesList/MessagesList';
import { MessageForm } from '../MessageForm/MessageForm';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';

type ChatType = {
  modifiers: string;
  messages: MessageType[];
  title: string;
  author: string;
  handleMessageSend: (message: MessageType) => void;
  deleteMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Chat: React.FC<ChatType> = ({ modifiers, messages, title, author,
                                handleMessageSend, deleteMessage }) => {
  // const elem = document.getElementById('listScroll2');
  const scroll = useRef<HTMLInputElement>(null);

  // можно использовать useCallback
  useEffect(() => {
    const listItem = scroll.current;
    // почему если я не пишу поовеку на существование то ошибка (Возможно, объект равен null)
    // но если пишу тоо тооже ошибка (Свойство "scrollTop" не существует в типе "never".)
    // if (listItem)
      // listItem.scrollTop = 9999;
  });

  return(
    <Card className={classnames('chat', modifiers)}>
      <CardHeader className='chat__header' 
                  title={title} />
      <CardContent className='chat__content'
                    id='listScroll2'
                    ref={scroll}>
        <List>
          <MessagesList messages={messages}
                        deleteMessage={deleteMessage} />
        </List>
      </CardContent>
      <CardActions className='chat__form'>
        <MessageForm onMessageSend={handleMessageSend}
                      author={author} />
      </CardActions>
    </Card>
  );
}