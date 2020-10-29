import React, { createRef, useEffect } from 'react';
import './Chat.scss';
import { Message } from './Message';
import { List, ListItem } from '@material-ui/core';

export const Chat: React.FC<ChatType> = ({
  user,
  deleteMessage,
  getMessageList,
}) => {
  const list: React.RefObject<HTMLUListElement> = createRef<HTMLUListElement>();

  useEffect(() => {
    if (list.current) list.current.scrollTop = 999999;
  }, [getMessageList]);

  return (
    <List className="Chat" ref={list}>
      {getMessageList().map((message: IMessage) => {
        return (
          <ListItem key={message.id} disableGutters>
            {message.username === user ? (
              <Message
                message={message}
                user={user}
                deleteMessage={deleteMessage}
              />
            ) : (
              <Message message={message} isBot deleteMessage={deleteMessage} />
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
